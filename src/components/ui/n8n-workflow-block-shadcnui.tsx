"use client";

import { motion, type PanInfo } from "framer-motion";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Database,
  Mail,
  Settings,
  Webhook,
  Zap,
} from "lucide-react";

// Interfaces
interface WorkflowNode {
  id: string;
  type: "trigger" | "action" | "condition";
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  col: number;
  row: "top" | "center" | "bottom";
  position?: { x: number; y: number };
}

interface WorkflowConnection {
  from: string;
  to: string;
}

// Constants for small nodes
const DEFAULT_NODE_WIDTH = 150;
const DEFAULT_NODE_HEIGHT = 80;

const initialNodesList: WorkflowNode[] = [
  {
    id: "node-1",
    type: "trigger",
    title: "User Intent",
    description: "Prompt or API request trigger",
    icon: Webhook,
    color: "emerald",
    col: 1,
    row: "center",
  },
  {
    id: "node-2",
    type: "action",
    title: "CrewAI Agent",
    description: "Orchestrates multi-agent execution",
    icon: Zap,
    color: "purple",
    col: 2,
    row: "top",
  },
  {
    id: "node-3",
    type: "action",
    title: "LangChain",
    description: "Chains prompts & retrieval",
    icon: Settings,
    color: "amber",
    col: 2,
    row: "bottom",
  },
  {
    id: "node-4",
    type: "action",
    title: "Python / Django",
    description: "Fast, robust API backend",
    icon: Database,
    color: "blue",
    col: 3,
    row: "center",
  },
  {
    id: "node-5",
    type: "action",
    title: "Next.js / React",
    description: "Sleek, interactive frontend",
    icon: Webhook,
    color: "emerald",
    col: 4,
    row: "top",
  },
  {
    id: "node-6",
    type: "action",
    title: "PostgreSQL",
    description: "Relational DB & vectors",
    icon: Database,
    color: "indigo",
    col: 4,
    row: "bottom",
  },
];

const connections: WorkflowConnection[] = [
  { from: "node-1", to: "node-2" },
  { from: "node-1", to: "node-3" },
  { from: "node-2", to: "node-4" },
  { from: "node-3", to: "node-4" },
  { from: "node-4", to: "node-5" },
  { from: "node-4", to: "node-6" },
];

const colorClasses: Record<string, string> = {
  emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
  blue: "border-blue-400/40 bg-blue-400/10 text-blue-400",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  purple: "border-purple-400/40 bg-purple-400/10 text-purple-400",
  indigo: "border-indigo-400/40 bg-indigo-400/10 text-indigo-400",
};

const colorTextClasses: Record<string, string> = {
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  indigo: "text-indigo-400",
};

// Connection Line Component
function WorkflowConnectionLine({
  from,
  to,
  nodes,
  getPosition,
  nodeWidth,
  nodeHeight,
}: {
  from: string;
  to: string;
  nodes: WorkflowNode[];
  getPosition: (node: WorkflowNode) => { x: number; y: number };
  nodeWidth: number;
  nodeHeight: number;
}) {
  const fromNode = nodes.find((n) => n.id === from);
  const toNode = nodes.find((n) => n.id === to);
  if (!fromNode || !toNode) return null;

  const fromPos = getPosition(fromNode);
  const toPos = getPosition(toNode);

  const startX = fromPos.x + nodeWidth;
  const startY = fromPos.y + nodeHeight / 2;
  const endX = toPos.x;
  const endY = toPos.y + nodeHeight / 2;

  const cp1X = startX + (endX - startX) * 0.5;
  const cp2X = endX - (endX - startX) * 0.5;

  const path = `M${startX},${startY} C${cp1X},${startY} ${cp2X},${endY} ${endX},${endY}`;
  const sourceColor = fromNode.color;

  return (
    <>
      {/* Background dashed connection line */}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeDasharray="6,5"
        strokeLinecap="round"
        opacity={0.45}
        className="text-foreground/60 transition-all duration-75"
      />
      {/* Animated traveling shiny beam overlay */}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        className={`animated-flow-line ${colorTextClasses[sourceColor] || "text-foreground"} transition-all duration-75`}
        filter="url(#glow)"
      />
    </>
  );
}

// Main Component
export function N8nWorkflowBlock() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodesList);
  const [hasInitializedPositions, setHasInitializedPositions] = useState(false);

  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);

  // Responsive variables
  const isDesktop = containerWidth >= 1024;
  const nodeWidth = isDesktop ? 220 : DEFAULT_NODE_WIDTH;
  const nodeHeight = isDesktop ? 120 : 90;

  const contentWidth = Math.max(1000, containerWidth);
  const contentHeight = isDesktop ? 430 : 390;

  // Measure container width
  useEffect(() => {
    if (!canvasRef.current) return;
    const updateSize = () => {
      if (canvasRef.current) {
        setContainerWidth(canvasRef.current.clientWidth);
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    window.addEventListener("resize", updateSize);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Compute positions
  const getPosition = useCallback((node: WorkflowNode) => {
    let basePos = node.position;

    if (!basePos) {
      // Fallback calculation during server rendering / first mount
      const activeWidth = Math.max(1000, containerWidth);
      const col1X = 40;
      const col4X = activeWidth - nodeWidth - 40;
      const col2X = col1X + (col4X - col1X) * 0.33;
      const col3X = col1X + (col4X - col1X) * 0.66;

      let x = col1X;
      if (node.col === 2) x = col2X;
      if (node.col === 3) x = col3X;
      if (node.col === 4) x = col4X;

      let y = 150;
      if (node.row === "top") {
        y = 40;
      } else if (node.row === "bottom") {
        y = contentHeight - nodeHeight - 40;
      } else {
        y = (contentHeight - nodeHeight) / 2;
      }

      basePos = { x, y };
    }

    // Always enforce constraints on the returned position dynamically
    const minX = 40;
    const maxX = contentWidth - nodeWidth - 40;
    const minY = 40;
    const maxY = contentHeight - nodeHeight - 40;

    return {
      x: Math.max(minX, Math.min(maxX, basePos.x)),
      y: Math.max(minY, Math.min(maxY, basePos.y)),
    };
  }, [containerWidth, contentWidth, contentHeight, nodeWidth, nodeHeight, isDesktop]);

  // Set initial positions in state once measured
  useEffect(() => {
    if (!hasInitializedPositions && containerWidth > 100) {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          position: getPosition(node),
        }))
      );
      setHasInitializedPositions(true);
    }
  }, [containerWidth, hasInitializedPositions, getPosition]);

  // Drag Handlers
  const handleDragStart = (nodeId: string) => {
    setDraggingNodeId(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      dragStartPosition.current = getPosition(node);
    }
  };

  const handleDrag = (nodeId: string, { offset }: PanInfo) => {
    if (draggingNodeId !== nodeId || !dragStartPosition.current) return;

    const newX = dragStartPosition.current.x + offset.x;
    const newY = dragStartPosition.current.y + offset.y;

    const minX = 40;
    const maxX = contentWidth - nodeWidth - 40;
    const minY = 40;
    const maxY = contentHeight - nodeHeight - 40;

    const constrainedX = Math.max(minX, Math.min(maxX, newX));
    const constrainedY = Math.max(minY, Math.min(maxY, newY));

    flushSync(() => {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeId
            ? { ...node, position: { x: constrainedX, y: constrainedY } }
            : node
        )
      );
    });
  };

  const handleDragEnd = () => {
    setDraggingNodeId(null);
    dragStartPosition.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/40 bg-background/60 backdrop-blur p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400"
          >
            Active
          </Badge>
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-foreground/50 font-heading">
            AI Agent Workflow Architecture
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`relative w-full overflow-x-auto overflow-y-hidden rounded-xl border border-border/30 bg-background/40 ${isDesktop ? "h-[430px]" : "h-[390px]"
          }`}
        role="region"
        aria-label="Workflow canvas"
        tabIndex={0}
      >
        {/* Content Wrapper */}
        <div
          className="relative h-full"
          style={{
            width: contentWidth,
            height: contentHeight,
          }}
        >
          {/* SVG Connections */}
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={contentWidth}
            height={contentHeight}
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            <defs>
              {/* Multi-stage blur filter to create a bright neon glow effect */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <style>{`
              @keyframes flow-beam {
                0% {
                  stroke-dashoffset: 200;
                }
                100% {
                  stroke-dashoffset: 0;
                }
              }
              .animated-flow-line {
                stroke-dasharray: 55, 145;
                animation: flow-beam 0.8s linear infinite;
              }
            `}</style>
            {connections.map((c) => (
              <WorkflowConnectionLine
                key={`${c.from}-${c.to}`}
                from={c.from}
                to={c.to}
                nodes={nodes}
                getPosition={getPosition}
                nodeWidth={nodeWidth}
                nodeHeight={nodeHeight}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const pos = getPosition(node);
            const isDragging = draggingNodeId === node.id;

            return (
              <motion.div
                key={node.id}
                drag
                dragMomentum={false}
                dragConstraints={{
                  left: 40,
                  top: 40,
                  right: contentWidth - nodeWidth - 40,
                  bottom: contentHeight - nodeHeight - 40,
                }}
                onDragStart={() => handleDragStart(node.id)}
                onDrag={(_, info) => handleDrag(node.id, info)}
                onDragEnd={handleDragEnd}
                style={{
                  x: pos.x,
                  y: pos.y,
                  width: nodeWidth,
                  transformOrigin: "0 0",
                }}
                className="absolute cursor-grab select-none"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
                aria-grabbed={isDragging}
              >
                <Card
                  className={`group/node relative w-full overflow-hidden rounded-xl border ${colorClasses[node.color]} bg-background/70 backdrop-blur transition-all hover:shadow-lg ${isDragging ? "shadow-xl ring-2 ring-primary/50" : ""} ${isDesktop ? "p-4" : "p-2.5"
                    }`}
                  role="article"
                  aria-label={`${node.type} node: ${node.title}`}
                  style={{ height: nodeHeight }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100" />

                  <div className="relative flex flex-col justify-between h-full w-full">
                    {/* Top Group: Header + Description */}
                    <div className={isDesktop ? "space-y-1.5" : "space-y-1"}>
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <div
                          className={`flex shrink-0 items-center justify-center rounded-md border ${colorClasses[node.color]} bg-background/80 backdrop-blur ${isDesktop ? "h-8 w-8" : "h-6 w-6"
                            }`}
                          aria-hidden="true"
                        >
                          <Icon className={isDesktop ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Badge
                            variant="outline"
                            className={`rounded-full border-border/40 bg-background/80 px-1 leading-none ${isDesktop ? "mb-1 py-0.5 text-[9px]" : "mb-0.5 py-0 text-[8px]"
                              } uppercase tracking-[0.1em] text-foreground/60`}
                          >
                            {node.type}
                          </Badge>
                          <h3 className={`truncate font-semibold tracking-tight text-foreground leading-tight ${isDesktop ? "text-xs md:text-[13px]" : "text-[11px]"
                            }`}>
                            {node.title}
                          </h3>
                        </div>
                      </div>
                      <p className={`line-clamp-2 leading-snug text-foreground/70 ${isDesktop ? "text-[10px] md:text-[11px]" : "text-[9px]"
                        }`}>
                        {node.description}
                      </p>
                    </div>

                    {/* Bottom Group: Connected Indicator */}
                    <div className={`flex items-center gap-1 text-foreground/50 ${isDesktop ? "text-[9px]" : "text-[8px]"
                      }`}>
                      <ArrowRight className={isDesktop ? "h-2.5 w-2.5" : "h-2 w-2"} aria-hidden="true" />
                      <span className="uppercase tracking-[0.05em] leading-none">
                        Connected
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/30 bg-background/40 px-4 py-2.5 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60">
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span className="uppercase tracking-[0.15em] font-medium">
              {nodes.length} Steps
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="uppercase tracking-[0.15em] font-medium">
              {connections.length} Connections
            </span>
          </div>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
          Drag steps to reposition
        </p>
      </div>
    </div>
  );
}
