import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"


const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
})

export function ContactForm() {

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data) {
    setIsLoading(true);
    await fetch('https://n8n.jefrien.dev/webhook/contact-me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    setIsLoading(false);
    toast(t("Message sent successfully"))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-2/3 space-y-6 mx-auto relative overflow-hidden p-2">

        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-background/80 z-10">
            <div className="flex items-center justify-center h-full">
              <Loader2 size={32} className="animate-spin" />
            </div>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>{t("Name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("Your name")} {...field} className='text-white placeholder:text-white/50 border-white/20' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>{t("Email")}</FormLabel>
              <FormControl>   
                <Input placeholder={t("Your email")} {...field} className='text-white placeholder:text-white/50 border-white/20' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"          
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white'>{t("Message")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("Your message")} {...field} className='text-white placeholder:text-white/50 border-white/20' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="text-center">
          <Button type="submit" disabled={isLoading}>{t("Send")}</Button>
        </div>
      </form>
      
    </Form>
  )
}
