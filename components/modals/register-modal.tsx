'use client'

import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

import { useRegisterModal } from '@/hooks/use-register-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Save } from 'lucide-react'

const registerFormSchema = z.object({
  userId: z.string().min(3),
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
  bio: z.string().optional(),
})

type RegisterFormSchemaValues = z.infer<typeof registerFormSchema>

type RegisterModalProps = {
  name?: string
  email?: string
  username?: string
  bio?: string
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  name,
  email,
  username,
  bio,
}) => {
  const registerModal = useRegisterModal()

  const { user, isLoaded } = useUser()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegisterFormSchemaValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name,
      email,
      username,
      bio,
    },
  })

  const { setValue } = form

  const onSubmit = async (values: RegisterFormSchemaValues) => {
    try {
      setIsLoading(true)

      const response = await axios.post('/api/musicians', values)

      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isLoaded) {
      setValue('userId', user?.id || '')
      setValue('name', user?.fullName || '')
      setValue('email', user?.emailAddresses[0].emailAddress || '')
      setValue('username', user?.username || '')
    }
  }, [isLoaded, setValue, user])

  return (
    <Modal
      title="Complete seu cadastro!"
      description="Para utilizar o aplicativo é necessário completar seu cadastro"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
    >
      <div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <div className="w-full flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="digite seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="digite seu melhor email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="digite o nome de usuário"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="secondary"
                type="submit"
                className="flex gap-2 self-start px-4 py-2"
                disabled={isLoading}
              >
                <Save size={28} />
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
