"use client"

import { useEffect, useState } from "react"
import { Mail, Linkedin } from "lucide-react"
import Image from "next/image"
import contacthand from "./../../public/contact-hands.png"
import { Fade, Slide } from 'react-awesome-reveal';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)






  return (
    <Slide>
    <section className="py-12 px-4 md:py-24 bg-background text-black dark:text-white" data-aos="fade-left">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-black dark:text-white"> <span className="bg-red-500 p-2">Contact</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          Do you have any questions or suggestions? Don't hesitate to contact me through the following means.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div>
              <div className="pt-6">
                <Image src={contacthand} className="w-full h-full" width={400} height={400} alt="contact logo" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 border-b-red-500 border-b-2">Contact Information</h3>
                <p className="text-muted-foreground mb-6">
                  You can contact me directly through my email or LinkedIn.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:soymarcos354@gmail.com" className="text-primary hover:underline">
                      soymarcos354@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/marcos-valero-50800525a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      linkedin.com/in/marcos-valero-50800525a
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Slide>
  )
}
