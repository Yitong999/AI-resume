'use client';

export function DeleteButton({ siteId }: { siteId: string }) {
  return (
    <button
      onClick={async () => {
        const res = await fetch(`/api/websites/${siteId}/delete`, { method: 'POST' });
        if (res.ok) {
          window.location.reload();
        } else {
          alert('Failed to delete site.');
        }
      }}
      className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
    >
      Delete
    </button>
  );
}
