"use client";

import {
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/utils/ui";

type Pos = { x: number; y: number };

type BoardCard = {
	id: string;
	/** Fraction (0–1) of the free space left of / above the card. */
	start: Pos;
	width: number;
	rotate: number;
	accent: string;
	className?: string;
	content: ReactNode;
};

// Listed back-to-front: the sticky sits underneath the other two.
const CARDS: BoardCard[] = [
	{
		id: "sticky",
		start: { x: 0.5, y: 0.78 },
		width: 118,
		rotate: 3,
		accent: "#d9a441",
		className: "text-center",
		content: <p className="text-sm font-bold tracking-tight">Organisation</p>,
	},
	{
		id: "todo",
		start: { x: 0.04, y: 0.1 },
		width: 112,
		rotate: -4,
		accent: "#3f8a82",
		content: (
			<>
				<p className="mb-1 font-semibold">This week</p>
				<p className="flex items-center gap-1.5">
					<span className="flex size-3 shrink-0 items-center justify-center rounded-[3px] bg-[#3f8a82] text-[8px] text-white">
						✓
					</span>
					<span className="line-through opacity-60">Cut the vlog</span>
				</p>
				<p className="flex items-center gap-1.5">
					<span className="size-3 shrink-0 rounded-[3px] border border-current opacity-60" />
					Thumbnail
				</p>
			</>
		),
	},
	{
		id: "note",
		start: { x: 0.96, y: 0.06 },
		width: 100,
		rotate: -2,
		accent: "#c96a4a",
		content: (
			<>
				<p className="mb-1 font-semibold">Ideas</p>
				<p className="opacity-70">Night timelapse, film grain</p>
			</>
		),
	},
];

/**
 * A tiny corkboard: drag the cards around, just like on a Scatter board.
 */
export function ScatterBoard() {
	const boardRef = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
	// Pixel positions of cards that have been dragged; the rest sit at their
	// fractional start position, so the board renders before any JS runs.
	const [positions, setPositions] = useState<Record<string, Pos>>({});
	const [order, setOrder] = useState(CARDS.map((card) => card.id));
	const dragRef = useRef<{
		id: string;
		pointerId: number;
		startX: number;
		startY: number;
		initial: Pos;
	} | null>(null);

	useEffect(() => {
		const onMove = (event: PointerEvent) => {
			const drag = dragRef.current;
			const board = boardRef.current;
			const card = drag && cardRefs.current[drag.id];
			if (!drag || !board || !card || event.pointerId !== drag.pointerId)
				return;
			const maxX = board.clientWidth - card.offsetWidth;
			const maxY = board.clientHeight - card.offsetHeight;
			const x = Math.max(
				0,
				Math.min(maxX, drag.initial.x + event.clientX - drag.startX),
			);
			const y = Math.max(
				0,
				Math.min(maxY, drag.initial.y + event.clientY - drag.startY),
			);
			setPositions((prev) => ({ ...prev, [drag.id]: { x, y } }));
		};
		const onEnd = (event: PointerEvent) => {
			if (dragRef.current?.pointerId === event.pointerId) {
				dragRef.current = null;
			}
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onEnd);
		window.addEventListener("pointercancel", onEnd);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onEnd);
			window.removeEventListener("pointercancel", onEnd);
		};
	}, []);

	const startDrag =
		(id: string) => (event: ReactPointerEvent<HTMLDivElement>) => {
			event.preventDefault();
			const card = event.currentTarget;
			event.currentTarget.setPointerCapture(event.pointerId);
			dragRef.current = {
				id,
				pointerId: event.pointerId,
				startX: event.clientX,
				startY: event.clientY,
				initial: positions[id] ?? { x: card.offsetLeft, y: card.offsetTop },
			};
			setOrder((prev) => [...prev.filter((other) => other !== id), id]);
		};

	return (
		<div ref={boardRef} className="absolute inset-0 select-none">
			{CARDS.map((card) => {
				const pos = positions[card.id];
				return (
					<div
						key={card.id}
						ref={(el) => {
							cardRefs.current[card.id] = el;
						}}
						onPointerDown={startDrag(card.id)}
						className={cn(
							"bg-background absolute cursor-grab touch-none rounded-md border p-2 text-left text-[11px] leading-snug shadow-sm active:cursor-grabbing",
							card.className,
						)}
						style={{
							width: card.width,
							left: pos ? pos.x : `calc((100% - ${card.width}px) * ${card.start.x})`,
							top: pos ? pos.y : `${card.start.y * 60}%`,
							rotate: `${card.rotate}deg`,
							zIndex: order.indexOf(card.id) + 1,
							borderTop: `4px solid ${card.accent}`,
						}}
					>
						{card.content}
					</div>
				);
			})}
		</div>
	);
}
