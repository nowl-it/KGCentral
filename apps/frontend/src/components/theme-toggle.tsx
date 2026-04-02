'use client';

import { Button } from '@kgcentral/ui/components/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@kgcentral/ui/components/dropdown-menu';
import { CheckIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers';

export default function ThemeToggleComponent() {
	const { theme: currentTheme, themes, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative group hover:bg-primary/10 hover:text-primary"
				>
					<Sun className="scale-100 size-5 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-primary" />
					<Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-accent" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				{themes.map((theme) => (
					<DropdownMenuItem
						key={theme}
						onClick={() => setTheme(theme)}
						className="gap-2 cursor-pointer"
					>
						<CheckIcon
							className={`size-4 ${theme === currentTheme ? 'opacity-100 text-primary' : 'opacity-0'}`}
						/>
						<p className="capitalize">{theme}</p>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
