/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

// Manejamos errores globales y los mostramos en el div#console si existe,
// o con alert() como fallback.

function notifyError(msg) {
  if (window.addLog) {
    window.addLog('ERROR: ' + msg);
  } else {
    alert(msg);
  }
}

addEventListener('unhandledrejection', event => {
  const reason = event.reason;
  notifyError(
    'Unhandled rejection\n' +
    `${reason}\n` +
    `${reason.sourceURL}:${reason.line}:${reason.column}\n` +
    `${reason.stack}`
  );
});

addEventListener('error', event => {
  const reason = event.error;
  notifyError(
    'Unhandled error\n' +
    `${reason}\n` +
    `${reason.sourceURL}:${reason.line}:${reason.column}\n` +
    `${reason.stack}`
  );
  return true;
});

// Función que será llamada desde el botón para iniciar el exploit.
export async function startExploit() {
  try {
    // Importa dinámicamente el exploit principal.
    await import('./psfree.mjs');
  } catch (e) {
    notifyError('Exploit failed: ' + e);
    throw e;
  }
}

// Nota: no importamos psfree.mjs automáticamente; esperamos a que el usuario pulse el botón.
