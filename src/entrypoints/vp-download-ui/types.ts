/**
 * Type definitions for the VirtualPiano download UI
 */

import { MusicSheet } from '../../components/music-sheet/types';

export type DownloadStatus = 'idle' | 'downloading' | 'success' | 'warning' | 'error' | 'sheet-exists';

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface DownloadState {
  status: DownloadStatus;
  message?: string;
}

export interface DownloadSuccessMessage {
  type: 'DOWNLOAD_SUCCESS';
  sheet: MusicSheet;
}

export interface DownloadErrorMessage {
  type: 'DOWNLOAD_ERROR';
  error: string;
}

export interface SheetDetectedMessage {
  type: 'SHEET_DETECTED';
  title: string;
  artist: string;
}

export type DownloadMessage = DownloadSuccessMessage | DownloadErrorMessage | SheetDetectedMessage;
