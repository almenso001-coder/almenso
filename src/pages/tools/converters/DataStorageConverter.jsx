import React from 'react'
import ConverterTemplate from '../../../components/converters/ConverterTemplate'

export default function DataStorageConverter() {
  return (
    <ConverterTemplate
      emoji="💾"
      heroColor="linear-gradient(135deg,#0f172a,#6366f1)"
      title="Data Storage Converter — Bytes, KB, MB, GB"
      description="Convert between bytes, kilobytes, megabytes and gigabytes. Useful for file sizes, storage planning, and tech specs."
      converterName="Data Storage"
      baseUnit="bytes"
      inputs={[
        { name: 'bytes', label: 'Bytes (B)', type: 'number', placeholder: 'Enter storage in bytes', defaultValue: '' },
      ]}
      formula={({ bytes }) => {
        const b = parseFloat(bytes)
        if (Number.isNaN(b)) {
          return { error: 'Please enter a valid number of bytes.' }
        }
        const kilobytes = b / 1024
        const megabytes = b / 1024 / 1024
        const gigabytes = b / 1024 / 1024 / 1024
        const terabytes = b / 1024 / 1024 / 1024 / 1024
        return {
          kilobytes: isFinite(kilobytes) ? Number(kilobytes.toFixed(4)) : 'Invalid input',
          megabytes: isFinite(megabytes) ? Number(megabytes.toFixed(6)) : 'Invalid input',
          gigabytes: isFinite(gigabytes) ? Number(gigabytes.toFixed(8)) : 'Invalid input',
          terabytes: isFinite(terabytes) ? Number(terabytes.toFixed(10)) : 'Invalid input',
        }
      }}
    />
  )
}
