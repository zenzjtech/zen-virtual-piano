/**
 * Type definitions for the VirtualPiano download UI
 */

export type DownloadStatus = 'idle' | 'downloading' | 'success' | 'error';

export interface DownloadState {
  status: DownloadStatus;
  message?: string;
}

export interface SheetData {
  title: string;
  artist: string;
  difficulty?: string;
  notation: string;
}

export interface DownloadSuccessMessage {
  type: 'DOWNLOAD_SUCCESS';
  sheet: SheetData;
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
