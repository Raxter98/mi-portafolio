import zipfile
import xml.etree.ElementTree as ET
import json
import datetime
import os

def parse_xlsx(file_path):
    with zipfile.ZipFile(file_path, 'r') as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_root = ET.fromstring(z.read('xl/sharedStrings.xml'))
            ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in ss_root.findall('.//main:si', ns):
                texts = [t.text for t in si.findall('.//main:t', ns) if t.text]
                shared_strings.append("".join(texts))
        
        sheet_root = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        rows = sheet_root.findall('.//main:row', ns)
        
        table = []
        header = {}
        for r_idx, row in enumerate(rows):
            row_dict = {}
            for c in row.findall('main:c', ns):
                ref = c.attrib.get('r')
                col = ''.join(filter(str.isalpha, ref))
                t = c.attrib.get('t')
                v = c.find('main:v', ns)
                val = v.text if v is not None else None
                if t == 's' and val is not None:
                    val = shared_strings[int(val)] if int(val) < len(shared_strings) else val
                row_dict[col] = val
            if r_idx == 0:
                header = row_dict
            else:
                table.append(row_dict)
                
    return header, table

def excel_serial_to_iso(serial_str):
    serial = float(serial_str)
    dt = datetime.datetime(1899, 12, 30) + datetime.timedelta(days=serial)
    return dt.strftime('%Y-%m-%d')

def sync_ecommerce():
    header, rows = parse_xlsx('public/E-Commerce-orders.xlsx')
    orders = []
    for r in rows:
        order = {
            "orderId": r['A'],
            "orderDate": excel_serial_to_iso(r['B']),
            "customerName": r['C'],
            "region": r['D'],
            "productName": r['E'],
            "category": r['F'],
            "quantity": int(float(r['G'])),
            "unitPrice": round(float(r['H']), 2),
            "discountPercent": int(float(r['I'])),
            "totalRevenue": round(float(r['J']), 2),
            "profit": round(float(r['K']), 2),
            "shipMode": r['L']
        }
        orders.append(order)
        
    out_path = 'data/ecommerce-orders.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(orders, f, indent=2, ensure_ascii=False)
    print(f"Generated {out_path} with {len(orders)} records.")

def sync_hospital():
    header, rows = parse_xlsx('public/Hospital-Patients.xlsx')
    patients = []
    for r in rows:
        adm_serial = float(r['E'])
        dis_serial = float(r['F'])
        los = int(dis_serial - adm_serial)
        total_bill = round(float(r['I']), 2)
        coverage_pct = int(float(r['J']))
        covered_amt = round(total_bill * (coverage_pct / 100.0), 2)
        oop_amt = round(total_bill - covered_amt, 2)
        
        patient = {
            "patientId": r['A'],
            "patientName": r['B'],
            "age": int(float(r['C'])),
            "gender": r['D'],
            "admissionDate": excel_serial_to_iso(r['E']),
            "dischargeDate": excel_serial_to_iso(r['F']),
            "lengthOfStayDays": los,
            "department": r['G'],
            "diagnosis": r['H'],
            "totalBillAmount": total_bill,
            "insuranceCoveragePercent": coverage_pct,
            "coveredAmount": covered_amt,
            "outOfPocketAmount": oop_amt,
            "paymentStatus": r['K']
        }
        patients.append(patient)
        
    out_path = 'data/hospital-patients.json'
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(patients, f, indent=2, ensure_ascii=False)
    print(f"Generated {out_path} with {len(patients)} records.")

if __name__ == '__main__':
    sync_ecommerce()
    sync_hospital()
