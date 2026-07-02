"use client";

import { Linkedin, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { useTranslation } from "../../hooks/useTranslation";
import contacthand from "./../../public/contact-hands.png";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Slide>
      <section className="px-4 py-12 md:py-24" data-aos="fade-left">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <span className="bg-red-500 text-white p-2 rounded">{t.contact.title}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Card */}
          <div className="grid gap-8 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5 shadow-2xl shadow-black/10 dark:shadow-black/30 backdrop-blur md:grid-cols-2 md:p-8 transition-all duration-300">
            {/* Image */}
            <div className="pt-2 md:pt-6">
              <Image
                src={contacthand}
                className="h-full w-full rounded-xl object-cover"
                width={400}
                height={400}
                alt="contact logo"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 border-b-2 border-b-red-500 text-xl font-semibold text-zinc-900 dark:text-white">
                    {t.contact.infoTitle}
                  </h3>
                  <p className="mb-6 text-zinc-600 dark:text-zinc-300">{t.contact.infoDesc}</p>
                </div>

                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-center">
                    <div className="mr-4 rounded-xl bg-red-500/15 p-3">
                      <Mail className="h-6 w-6 text-red-500 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{t.contact.email}</p>
                      <a
                        href="mailto:marcos@marcosvalero.com"
                        className="text-red-500 dark:text-red-300 hover:underline text-sm"
                      >
                        marcos@marcosvalero.com
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center">
                    <div className="mr-4 rounded-xl bg-red-500/15 p-3">
                      <Linkedin className="h-6 w-6 text-red-500 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{t.contact.linkedin}</p>
                      <a
                        href="https://www.linkedin.com/in/marcos-valero-50800525a/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 dark:text-red-300 hover:underline text-sm"
                      >
                        linkedin.com/in/marcos-valero
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/56935264725"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-3 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-400 active:scale-95"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp +56 9 3526 4725
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Slide>
  );
}
