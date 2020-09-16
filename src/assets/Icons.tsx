import React from 'react'

export const Next: React.FC = () => (
    <svg viewBox="0 0 512 512">
        <polyline
            points="268 112 412 256 268 400"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
            }}
        />
        <line
            x1="392"
            y1="256"
            x2="100"
            y2="256"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
            }}
        />
    </svg>
)

export const Previous: React.FC = () => (
    <svg viewBox="0 0 512 512">
        <polyline
            points="244 400 100 256 244 112"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
            }}
        />
        <line
            x1="120"
            y1="256"
            x2="412"
            y2="256"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
            }}
        />
    </svg>
)

export const Close: React.FC = () => (
    <svg viewBox="0 0 512 512">
        <line
            x1="368"
            y1="368"
            x2="144"
            y2="144"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '48px',
            }}
        />
        <line
            x1="368"
            y1="144"
            x2="144"
            y2="368"
            style={{
                fill: 'none',
                stroke: '#000',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: '32px',
            }}
        />
    </svg>
)
