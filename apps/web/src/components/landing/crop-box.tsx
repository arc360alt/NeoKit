"use client";

import {
	type PropsWithChildren,
	type PointerEvent as ReactPointerEvent,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/utils/ui";

type Side = "top" | "right" | "bottom" | "left";
type Insets = Record<Side, number>;

const MIN_SIZE_PX = 48;
const ROTATE_DEG = -2.4;

/**
 * A crop frame around its children. Drag any edge or corner to "crop" the
 * content, just like the crop tool inside the editor.
 */
export function CropBox({ children }: PropsWithChildren) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });
	const [insets, setInsets] = useState<Insets>({
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	});
	const [isDragging, setIsDragging] = useState(false);
	const dragRef = useRef<{
		sides: Side[];
		pointerId: number;
		startX: number;
		startY: number;
		initial: Insets;
	} | null>(null);

	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const update = () =>
			setSize({ width: container.offsetWidth, height: container.offsetHeight });
		const observer = new ResizeObserver(update);
		observer.observe(container);
		update();
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const onMove = (event: PointerEvent) => {
			const drag = dragRef.current;
			if (!drag || event.pointerId !== drag.pointerId) return;
			// Undo the container rotation so drags follow the pointer.
			const rad = (-ROTATE_DEG * Math.PI) / 180;
			const rawX = event.clientX - drag.startX;
			const rawY = event.clientY - drag.startY;
			const dx = rawX * Math.cos(rad) - rawY * Math.sin(rad);
			const dy = rawX * Math.sin(rad) + rawY * Math.cos(rad);

			setInsets(() => {
				const next = { ...drag.initial };
				for (const side of drag.sides) {
					if (side === "left") {
						next.left = clampInset(
							drag.initial.left + dx,
							size.width - next.right - MIN_SIZE_PX,
						);
					}
					if (side === "right") {
						next.right = clampInset(
							drag.initial.right - dx,
							size.width - next.left - MIN_SIZE_PX,
						);
					}
					if (side === "top") {
						next.top = clampInset(
							drag.initial.top + dy,
							size.height - next.bottom - MIN_SIZE_PX / 2,
						);
					}
					if (side === "bottom") {
						next.bottom = clampInset(
							drag.initial.bottom - dy,
							size.height - next.top - MIN_SIZE_PX / 2,
						);
					}
				}
				return next;
			});
		};
		const onEnd = (event: PointerEvent) => {
			if (dragRef.current?.pointerId !== event.pointerId) return;
			dragRef.current = null;
			setIsDragging(false);
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onEnd);
		window.addEventListener("pointercancel", onEnd);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onEnd);
			window.removeEventListener("pointercancel", onEnd);
		};
	}, [size.width, size.height]);

	const startDrag =
		(sides: Side[]) => (event: ReactPointerEvent<HTMLDivElement>) => {
			event.preventDefault();
			event.currentTarget.setPointerCapture(event.pointerId);
			dragRef.current = {
				sides,
				pointerId: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				initial: insets,
			};
			setIsDragging(true);
		};

	const frameStyle = {
		top: insets.top,
		right: insets.right,
		bottom: insets.bottom,
		left: insets.left,
	};
	const clip = `inset(${insets.top}px ${insets.right}px ${insets.bottom}px ${insets.left}px round 0.5rem)`;

	return (
		<div className="flex justify-center leading-16">
			<div
				ref={containerRef}
				className="relative mt-2 select-none"
				style={{ transform: `rotate(${ROTATE_DEG}deg)` }}
			>
				<span className="text-foreground/15 relative z-0 inline-flex items-center justify-center px-9 py-1">
					{children}
				</span>
				<span
					aria-hidden
					className="absolute inset-0 z-0 inline-flex items-center justify-center px-9 py-1"
					style={{ clipPath: clip, WebkitClipPath: clip }}
				>
					{children}
				</span>

				<div className="absolute z-10" style={frameStyle}>
					<div className="border-primary absolute inset-0 rounded-lg border-2" />
					<div
						className={cn(
							"pointer-events-none absolute inset-0 transition-opacity",
							isDragging ? "opacity-100" : "opacity-0",
						)}
					>
						<div className="bg-primary/40 absolute top-0 bottom-0 left-1/3 w-px" />
						<div className="bg-primary/40 absolute top-0 bottom-0 left-2/3 w-px" />
						<div className="bg-primary/40 absolute top-1/3 right-0 left-0 h-px" />
						<div className="bg-primary/40 absolute top-2/3 right-0 left-0 h-px" />
					</div>

					<EdgeHandle className="-left-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize" onPointerDown={startDrag(["left"])} />
					<EdgeHandle className="-right-1.5 top-1/2 h-8 w-3 -translate-y-1/2 cursor-ew-resize" onPointerDown={startDrag(["right"])} />
					<EdgeHandle className="-top-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize" onPointerDown={startDrag(["top"])} />
					<EdgeHandle className="-bottom-1.5 left-1/2 h-3 w-8 -translate-x-1/2 cursor-ns-resize" onPointerDown={startDrag(["bottom"])} />

					<CornerHandle className="-top-2 -left-2 cursor-nwse-resize border-t-4 border-l-4" onPointerDown={startDrag(["top", "left"])} />
					<CornerHandle className="-top-2 -right-2 cursor-nesw-resize border-t-4 border-r-4" onPointerDown={startDrag(["top", "right"])} />
					<CornerHandle className="-bottom-2 -left-2 cursor-nesw-resize border-b-4 border-l-4" onPointerDown={startDrag(["bottom", "left"])} />
					<CornerHandle className="-right-2 -bottom-2 cursor-nwse-resize border-r-4 border-b-4" onPointerDown={startDrag(["bottom", "right"])} />
				</div>
			</div>
		</div>
	);
}

function clampInset(value: number, max: number) {
	return Math.max(0, Math.min(Math.max(0, max), value));
}

function EdgeHandle({
	className,
	onPointerDown,
}: {
	className: string;
	onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
	return (
		<div
			className={cn(
				"bg-background border-primary absolute z-20 touch-none rounded-full border-2",
				className,
			)}
			onPointerDown={onPointerDown}
		/>
	);
}

function CornerHandle({
	className,
	onPointerDown,
}: {
	className: string;
	onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
	return (
		<div
			className={cn(
				"border-primary absolute z-20 size-6 touch-none rounded-[3px]",
				className,
			)}
			onPointerDown={onPointerDown}
		/>
	);
}
