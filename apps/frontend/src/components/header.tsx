import Link from 'next/link';

export default function HeaderComponent() {
	return (
		<header className="bg-primary text-primary-foreground flex items-center justify-between p-2">
			<Link href="/" className="flex items-center gap-2">
				<h1 className="text-xl font-bold">KGCentral</h1>
			</Link>
		</header>
	);
}
