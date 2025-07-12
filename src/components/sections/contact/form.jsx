import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


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

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(data) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 mx-auto">
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
          <Button type="submit">{t("Send")}</Button>
        </div>
      </form>
    </Form>
  )
}
