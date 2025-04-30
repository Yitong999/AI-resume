'use client';

export function DeactivateButton({ siteId }: { siteId: string }) {
  return (
    <button
      onClick={async () => {
        const res = await fetch(`/api/websites/${siteId}/deactivate`, { method: 'POST' });
        if (res.ok) {
          window.location.reload();
        } else {
          alert('Failed to deactivate.');
        }
      }}
      className="text-yellow-600 border border-yellow-600 px-3 py-1 rounded hover:bg-yellow-50"
    >
      Deactivate
    </button>
  );
}
