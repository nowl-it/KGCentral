'use client';

import { useI18n } from '../components/providers';

export default function Home() {
	const { t, locale, setLocale } = useI18n();

	return <main className="min-h-screen p-8"></main>;
}
