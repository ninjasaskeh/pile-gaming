"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Building2, Clock, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_CONTENT } from "@/constants";
import type { ContactContent } from "@/lib/content";
import { useSectionRevealPreset } from "@/lib/useGsapReveal";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  subject: z.string().min(2).max(255),
  message: z.string(),
});

export const ContactSection = ({ data }: { data?: ContactContent | null }) => {
  useSectionRevealPreset("contact", "fadeUp");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject:
        (data?.subjectOptions || CONTACT_CONTENT.subjectOptions || [""])[0] ??
        "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, email, subject, message } = values;
    console.log(values);

    const mailToLink = `${
      data?.emailHref || CONTACT_CONTENT.emailHref
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Hello, I'm ${firstName} ${lastName}. Email: ${email}.\n\n${message}`
    )}`;

    window.location.href = mailToLink;
  }

  return (
    <section id="contact" className="container py-24 sm:py-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="gsap-reveal">
          <div className="mb-4">
            <h2 className="text-lg text-primary mb-2 tracking-wider">
              {data?.kicker || CONTACT_CONTENT.kicker}
            </h2>

            <h2 className="text-3xl md:text-4xl font-bold">
              {data?.title || CONTACT_CONTENT.title}
            </h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            {data?.description || CONTACT_CONTENT.description}
          </p>

          <div className="flex flex-col gap-4">
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div className="font-bold">Address</div>
              </div>
              <div>{data?.address || CONTACT_CONTENT.address}</div>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Phone />
                <div className="font-bold">Phone</div>
              </div>
              <a
                href={data?.phoneHref || CONTACT_CONTENT.phoneHref}
                className="hover:underline"
              >
                {data?.phone || CONTACT_CONTENT.phone}
              </a>
            </div>

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">Email</div>
              </div>
              <a
                href={data?.emailHref || CONTACT_CONTENT.emailHref}
                className="hover:underline"
              >
                {data?.email || CONTACT_CONTENT.email}
              </a>
            </div>

            <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Business Hours</div>
              </div>

              <div>
                <div>
                  {data?.businessHours?.days ||
                    CONTACT_CONTENT.businessHours.days}
                </div>
                <div>
                  {data?.businessHours?.hours ||
                    CONTACT_CONTENT.businessHours.hours}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card gsap-reveal">
          <CardHeader className="text-primary text-2xl"> </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4 gsap-reveal"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              data?.formPlaceholders?.firstName ||
                              CONTACT_CONTENT.formPlaceholders.firstName
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              data?.formPlaceholders?.lastName ||
                              CONTACT_CONTENT.formPlaceholders.lastName
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={CONTACT_CONTENT.formPlaceholders.email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(
                              data?.subjectOptions ||
                              CONTACT_CONTENT.subjectOptions ||
                              []
                            ).map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={
                              data?.formPlaceholders?.message ||
                              CONTACT_CONTENT.formPlaceholders.message
                            }
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="mt-4">Send</Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter></CardFooter>
        </Card>
      </section>
    </section>
  );
};
