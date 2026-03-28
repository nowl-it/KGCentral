'use client';
import { Button } from '@kgcentral/ui/components/button';
import { useChangeLanguage } from 'next-i18next/client';

export default function LanguageSwitcher() {
	const changeLanguage = useChangeLanguage();
	return (
		<div>
			<Button onClick={() => changeLanguage('en')}>English</Button>
			<Button onClick={() => changeLanguage('vi')}>Tiếng Việt</Button>
		</div>
	);
}
