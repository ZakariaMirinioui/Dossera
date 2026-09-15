import { useEffect, useId, useRef, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

export interface AccordionItem {
    id: string;
    renderHeader: (state: { isOpen: boolean }) => React.ReactNode;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    /** Whether multiple items can be open at once. Default false. */
    multiple?: boolean;
    /** Controlled open item index (single mode) or indices (multiple mode). */
    openIndices?: number[];
    onOpenChange?: (indices: number[]) => void;
    className?: string;
    itemClassName?: string;
}

export default function Accordion({
    items,
    multiple = false,
    openIndices,
    onOpenChange,
    className = '',
    itemClassName = '',
}: AccordionProps) {
    const baseId = useId().replace(/[^a-zA-Z0-9]/g, '');
    const [internal, setInternal] = useState<number[]>(multiple ? [] : []);
    const prefersReducedMotion = usePrefersReducedMotion();

    const isControlled = openIndices !== undefined;
    const currentOpen = isControlled ? openIndices : internal;

    const toggle = (index: number) => {
        const next = currentOpen.includes(index)
            ? currentOpen.filter((i) => i !== index)
            : multiple
                ? [...currentOpen, index]
                : [index];
        if (isControlled) {
            onOpenChange?.(next);
        } else {
            setInternal(next);
        }
    };

    return (
        <div className={`oevra-accordion ${className}`}>
            {items.map((item, i) => {
                const isOpen = currentOpen.includes(i);
                return (
                    <AccordionPanel
                        key={item.id}
                        item={item}
                        index={i}
                        isOpen={isOpen}
                        baseId={baseId}
                        itemClassName={itemClassName}
                        prefersReducedMotion={prefersReducedMotion}
                        onToggle={() => toggle(i)}
                    />
                );
            })}
        </div>
    );
}

interface AccordionPanelProps {
    item: AccordionItem;
    index: number;
    isOpen: boolean;
    baseId: string;
    itemClassName: string;
    prefersReducedMotion: boolean;
    onToggle: () => void;
}

function AccordionPanel({
    item,
    index,
    isOpen,
    baseId,
    itemClassName,
    prefersReducedMotion,
    onToggle,
}: AccordionPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const triggerId = `${baseId}-trigger-${index}`;
    const panelId = `${baseId}-panel-${index}`;

    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.inert = !isOpen;
        }
    }, [isOpen]);

    return (
        <div
            className={`oevra-accordion__item ${itemClassName} ${isOpen ? 'is-open' : ''}`}
        >
            <button
                id={triggerId}
                type="button"
                className="oevra-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-cursor="hover"
                onClick={onToggle}
            >
                {item.renderHeader({ isOpen })}
            </button>

            <div
                ref={panelRef}
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                className={`oevra-accordion__panel ${isOpen ? 'is-open' : ''}`}
                style={prefersReducedMotion ? { display: isOpen ? undefined : 'none' } : undefined}
            >
                <div className="oevra-accordion__panel-inner">
                    {item.content}
                </div>
            </div>
        </div>
    );
}