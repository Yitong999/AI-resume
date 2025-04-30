import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DeactivateButton } from '@/components/deactivate-button';
import { DeleteButton } from "@/components/delete-button";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const websites = await prisma.website.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      deployedAt: "desc",
    },
  });

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Your Domains</h1>
      <ul className="space-y-4">
        {websites.map((site) => (
          <li key={site.id} className="flex items-center justify-between border rounded p-4">
            <div>
              <p className="text-lg font-semibold">{site.domain}</p>
              <p className="text-sm text-gray-500">
                Template: {site.template} • Status:{" "}
                {site.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-500">Deactivated</span>
                )}
              </p>
              <p className="text-xs text-gray-400">
                Permanent (paid user) | Created on: {site.deployedAt.toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              {site.isActive && (
                <DeactivateButton siteId={site.id} />
              )}
                <DeleteButton siteId={site.id} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
