/**
 * Type definitions for the VirtualPiano download UI
 */

import { MusicSheet } from '../../components/music-sheet/types';

export type DownloadStatus = 'idle' | 'downloading' | 'success' | 'warning' | 'error';

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

export type DownloadMessage = DownloadSuccessMessage | DownloadErrorMessage;

export interface Ripple {
  x: number;
  y: number;
  id: number;
}
