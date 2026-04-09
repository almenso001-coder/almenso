import React from 'react'
import CalculatorTemplate from '../../../components/calculators/CalculatorTemplate'

export default function TileCalculator() {
  return (
    <>
      <CalculatorTemplate
        title="Free Tile Calculator — Estimate Tile Quantity" 
        description="Estimate how many tiles you need based on area and tile size, including a margin for waste." 
        inputs={[
          { name: 'area', label: 'Area (sq ft)', type: 'number', placeholder: 'Enter area to cover', defaultValue: '' },
          { name: 'tileSize', label: 'Tile Size (sq ft)', type: 'number', placeholder: 'Enter tile area', defaultValue: '' },
          { name: 'waste', label: 'Waste Allowance (%)', type: 'number', placeholder: 'Enter waste percentage', defaultValue: '10' },
        ]}
        affCategory="construction"
      hasResult={true}
        formula={({ area, tileSize, waste }) => {
          const a = parseFloat(area)
          const tile = parseFloat(tileSize)
          const w = parseFloat(waste)
          if (Number.isNaN(a) || Number.isNaN(tile) || Number.isNaN(w) || a <= 0 || tile <= 0) {
            return { error: 'Please enter valid numbers greater than zero.' }
          }

          const baseTiles = a / tile
          const totalTiles = baseTiles * (1 + w / 100)

          return {
            tilesRequired: isFinite(totalTiles) ? Math.ceil(totalTiles) : 'Invalid input',
            formula: `Tiles = (Area / Tile area) × (1 + waste%) = ${totalTiles}`
          }
        }}
      />

      <section className="calc-info">
        <h2>How to use</h2>
        <p>
          Enter the total area to cover, the area of one tile, and an optional waste percentage.
          The calculator provides an estimate including extra tiles for cuts and breaks.
        </p>

        <h2>Why include waste</h2>
        <p>
          Cutting tiles and fitting around obstacles leads to waste. A typical range is 10–15% extra.
        </p>

        <h2>FAQ</h2>
        <h3>How do I find tile area?</h3>
        <p>
          Multiply tile length by width (in feet) to get the area in square feet.
        </p>

        <h3>Should I buy whole tiles?</h3>
        <p>
          Yes. Tiles are sold by count, so round up to the next whole tile.
        </p>

        <h3>What if I have multiple tile sizes?</h3>
        <p>
          Estimate separately for each size and add the totals, or use the largest size for a rough estimate.
        </p>
      </section>
    </>
  )
}
