
import {
  CircuitBoard, Server, Network, ShieldCheck, Activity, Zap, Layers, Globe, Radio, GitMerge,
  AlertCircle, ArrowLeftRight, Database, Cpu, Leaf, Palette, Code, Lightbulb, Grid, Home,
  Layout, GitCompare, BarChart2, HardDrive, Rocket, Microscope, Terminal, BookOpen, Smartphone,
  Search, Download, Eye, Keyboard, Settings, Lock, Check, X, Save, Trash2, Plus, RotateCcw,
  LogOut, Edit, Moon, Sun, Type, MousePointer, Maximize, Minimize, List, CheckSquare, Video,
  Mic, Cloud, Flag, Share2, Clock, MessageSquare, Users, FileText, Printer, Bookmark, WifiOff,
  Image, TriangleAlert, CircleHelp, ArrowUp, Menu, Info, Pen, Box, TrendingUp
} from 'lucide-react';

/**
 * ICON MAPPING
 *
 * Why this exists:
 * We cannot save React Components (functions) to LocalStorage via JSON.stringify().
 * Instead, we store a string key (e.g., "Server") in the data.
 * Components use this map to resolve the string key back to the actual Lucide Icon component at runtime.
 */
export const ICON_MAP: Record<string, any> = {
  CircuitBoard, Server, Network, ShieldCheck, Activity, Zap, Layers, Globe, Radio, GitMerge,
  AlertCircle, ArrowLeftRight, Database, Cpu, Leaf, Palette, Code, Lightbulb, Grid, Home,
  Layout, GitCompare, BarChart2, HardDrive, Rocket, Microscope, Terminal, BookOpen, Smartphone,
  Search, Download, Eye, Keyboard, Settings, Moon, Sun, Type, MousePointer, Maximize, Minimize,
  List, CheckSquare, Video, Mic, Cloud, Flag, Share2, Save, Clock, MessageSquare, Users, FileText,
  Printer, Bookmark, WifiOff, Image, TriangleAlert, CircleHelp, ArrowUp, Menu, Info, Edit, Pen,
  AlertTriangle: TriangleAlert, HelpCircle: CircleHelp, Edit2: Edit, Box, TrendingUp,
  Lock, Check, X, Trash2, Plus, RotateCcw, LogOut,
};
