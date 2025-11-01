import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Profile",
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
export const revalidate = 0
export const __module = true as const

export default async function Page() {
  const session = await auth()
  const user = session?.user

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>Informasi akun admin yang sedang login.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-24 text-muted-foreground">Nama</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{user?.name ?? "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-muted-foreground">Email</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{user?.email ?? "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-24 text-muted-foreground">Role</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{user?.role ?? "-"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan</CardTitle>
          <CardDescription>Form pengaturan singkat (placeholder).</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Di sini Anda dapat menambahkan form untuk mengubah nama, avatar, atau password.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
