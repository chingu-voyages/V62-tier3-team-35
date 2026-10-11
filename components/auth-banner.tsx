import { Dot } from "lucide-react";
import { Logo } from "@/components/logo";
import { Fragment } from "react";


const tags = ["learn", "build", "grow"];

export default function AuthBanner() {
	return (
		<>
			<div className="flex justify-center items-center flex-col h-full">
				<Logo size="xl"/>
				<h2 className="text-background font-bold text-6xl pt-4"> Pathway </h2>

				<div className="flex items-center gap-2 pt-3">
					{tags.map((tag, idx, arr) => (
						<Fragment key={idx}>
							<span className="uppercase text-muted-foreground tracking-[6px] text-xs/5 font-medium">
								{tag}
							</span>
							{idx == arr.length - 1 ? null : <Dot className="size-2 stroke-muted-foreground" />}
						</Fragment>
					))}
				</div>
			</div>

			<p className="text-center text-muted-foreground text-lg mt-auto">
				A structured learning path <br />
				to a brighter future
			</p>
		</>
	)
}
