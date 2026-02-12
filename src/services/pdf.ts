import type { PageSize } from '../types/resume'

export async function exportToPdf(pageSize: PageSize) {
  const element = document.getElementById('resume-preview')
  if (!element) return

  // Use browser print with specific styling for clean PDF output
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Por favor permite ventanas emergentes para descargar el PDF.')
    return
  }

  const width = pageSize === 'a4' ? '210mm' : '216mm'
  const height = pageSize === 'a4' ? '297mm' : '279mm'

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>CV</title>
      <style>
        @page {
          size: ${width} ${height};
          margin: 0;
        }
        html, body {
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        body {
          width: ${width};
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body>${element.outerHTML}</body>
    </html>
  `)
  printWindow.document.close()

  // Wait for fonts to load then trigger print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }
}
