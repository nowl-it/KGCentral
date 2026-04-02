'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@kgcentral/ui/components/select';
import { useChangeLanguage, useT } from 'next-i18next/client';
import { languages } from '@/lib/i18n.config';

export default function LanguageSwitcher() {
	const changeLanguage = useChangeLanguage();
	const { i18n } = useT('breadcrumbs');

	const currentLng =
		languages.find((lang) => lang.code === i18n.language)?.code || languages[0].code;

	return (
		<Select onValueChange={(value) => changeLanguage(value)} defaultValue={currentLng}>
			<SelectTrigger className="w-full max-w-48">
				<SelectValue />
			</SelectTrigger>
			<SelectContent align="end" position="popper">
				<SelectGroup>
					{languages.map((lang) => (
						<SelectItem key={lang.code} value={lang.code}>
							{lang.flag} {lang.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
