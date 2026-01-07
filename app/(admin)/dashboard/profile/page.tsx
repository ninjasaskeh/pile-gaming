import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Profile",
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Profile</h1>
        <p className="text-sm text-muted-foreground">
          Informasi akun admin yang sedang login.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-40 text-muted-foreground">Nama</TableCell>
              <TableCell className="w-6">
                <Separator orientation="vertical" className="h-4" />
              </TableCell>
              <TableCell>{user?.name ?? "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-40 text-muted-foreground">Email</TableCell>
              <TableCell className="w-6">
                <Separator orientation="vertical" className="h-4" />
              </TableCell>
              <TableCell>{user?.email ?? "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-40 text-muted-foreground">Role</TableCell>
              <TableCell className="w-6">
                <Separator orientation="vertical" className="h-4" />
              </TableCell>
              <TableCell>{user?.role ?? "-"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
