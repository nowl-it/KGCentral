'use client';

import { Button } from '@kgcentral/ui/components/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@kgcentral/ui/components/dropdown-menu';
import { CheckIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggleComponent() {
	const { theme: currentTheme, themes, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="w-fit">
					<Sun className="scale-100 size-6 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((theme) => (
					<DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
						<CheckIcon
							className={theme === currentTheme ? 'opacity-100' : 'opacity-0'}
						/>
						<p>{theme.charAt(0).toUpperCase() + theme.slice(1)}</p>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
