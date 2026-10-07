import * as React from "react";
import { cn } from "cn";

interface AuthHeaderProps {
	title: string;
	description: string;
}

export default function AuthHeader({ title, description, className }: AuthHeaderProps & React.ComponentProps<"header">) {
	return (
		<header className={cn("pb-8 sm:pb-9 text-left", className)}>
			<h1 className="font-bold text-3xl sm:text-4xl text-foreground pb-0.5">{title}</h1>
			<p className="text-muted-foreground">{description}</p>
		</header >
	)
}
