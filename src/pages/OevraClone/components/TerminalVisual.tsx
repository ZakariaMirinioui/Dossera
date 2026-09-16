import { content } from '../content/dosseraLanding';

/* ═══════════════════════════════════════════════════
   <TerminalVisual /> — the dark PFSENSE/PROXMOX/DOSSERA
   terminal card used in the hero band and the capability
   list. `activeIndex` pulses the matching unit's LED.
   ═══════════════════════════════════════════════════ */

interface TerminalVisualProps {
    activeIndex?: number;
    className?: string;
    lines?: string[];
}

export default function TerminalVisual({
    activeIndex = -1,
    className = '',
    lines,
}: TerminalVisualProps) {
    const units = content.terminal.units;

    return (
        <div className={`dz-terminal ${className}`} data-cursor="hover">
            <div className="dz-terminal__bar">
                <span className="dz-terminal__traffic" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                </span>
                <span className="dz-terminal__title">
                    {content.terminal.rackName} — {content.terminal.rackRole}
                </span>
                <span className="dz-terminal__status">
                    <span className="dz-terminal__pulse" aria-hidden="true" />
                    SYSTEM ONLINE
                </span>
            </div>

            <div className="dz-terminal__body">
                <div className="dz-terminal__logs" aria-hidden="true">
                    {(lines ?? content.terminal.bootLines).map((line) => (
                        <span className="dz-terminal__log" key={line}>
                            <span className="dz-terminal__log-prompt">&gt;</span>
                            {line}
                        </span>
                    ))}
                </div>

                <div className="dz-terminal__rack">
                    {units.map((unit, i) => (
                        <div
                            key={unit.name}
                            className={`dz-terminal__unit${activeIndex === i ? ' is-active' : ''}`}
                        >
                            <span className="dz-terminal__led" aria-hidden="true" />
                            <span className="dz-terminal__unit-name">{unit.name}</span>
                            <span className="dz-terminal__unit-role">{unit.role}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}