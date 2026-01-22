# Quebec Energy Grid Manager

A strategic energy management game where you control Quebec's power grid and balance energy production, local demand, and exports to neighboring regions.

## Game Overview

You are the manager of Quebec's energy grid. Your goal is to:
- **Balance production with demand** - Ensure you produce enough energy for Quebec's needs
- **Fulfill export contracts** - Meet your commitments to New York, New Hampshire, and New England
- **Maximize revenue** - Export surplus energy to earn money
- **Maintain reputation** - Keep the grid stable to avoid blackouts and maintain public trust

## How to Play

### Starting the Game

1. Open `energy-grid-game.html` in your web browser
2. The game starts on Day 1 with default settings

### Game Interface

#### Production Panel (Left)
Manage your energy sources:
- **Hydro Plant** - Adjustable base power (0-2000 MW)
- **Nuclear Plant** - Fixed base load (900 MW)
- **Wind Farm** - Weather dependent (0-500 MW)
- **Solar Farm** - Weather dependent (0-300 MW)

Only the Hydro Plant can be manually adjusted. Renewable sources change based on weather conditions each day.

#### Demand Panel (Center)
Shows Quebec's local energy demand:
- Demand varies between 1800-2200 MW
- The bar indicator shows current demand level
- Meeting demand is your #1 priority

#### Transmission & Exports Panel (Right)
Manage exports to three regions:
- **New York** - Capacity: 800 MW | Price: $50/MW | Contract: 150 MW
- **New Hampshire** - Capacity: 400 MW | Price: $45/MW | Contract: 100 MW
- **New England** - Capacity: 600 MW | Price: $48/MW | Contract: 120 MW

Each region has:
- **Capacity** - Maximum transmission line capacity
- **Price** - Revenue per MW exported
- **Contract** - Minimum export commitment (failure = penalty)

### Game Mechanics

#### Balancing the Grid
The fundamental equation is:
```
Production = Local Demand + Exports
```

- **Balanced** (±50 MW) - Grid is stable, reputation increases
- **Oversupply** (>50 MW excess) - Wasted energy, no penalty
- **Shortage** (>50 MW deficit) - BLACKOUT! Major reputation loss

#### Revenue System
- Earn money by exporting energy: `Export Amount × Price per MW`
- Contract penalties: If you export less than the contract amount, you pay 50% of the shortfall value
- Example: NY contract is 150 MW at $50/MW. If you only export 100 MW:
  - Revenue: 100 × $50 = $5,000
  - Penalty: (150-100) × $50 × 0.5 = $1,250
  - Net: $3,750

#### Reputation System
- Start with 100 reputation
- Blackouts: -10 reputation
- Balanced grid: +2 reputation
- Failed contracts: -2 reputation
- Game Over: Reputation reaches 0

#### Random Events
Each day may trigger events:
- Equipment failures (reduced capacity)
- Transmission line damage
- Heat waves (increased demand)
- Price changes

### Strategy Tips

1. **Prioritize Local Demand** - Always ensure Quebec has enough power
2. **Meet Contracts First** - Fulfill minimum export commitments before maximizing exports
3. **Plan for Variability** - Keep extra capacity for demand spikes and renewable fluctuations
4. **Balance Risk vs Reward** - Exporting more earns more money but increases blackout risk
5. **Monitor Weather** - Renewable sources change daily; adjust hydro production accordingly

### Controls

- **Sliders** - Adjust hydro production and export levels in real-time
- **Next Day** - Advance to the next day and see results
- **Reset Game** - Start over from Day 1

### Winning Strategy

There's no "end" to the game, but success means:
- Maintaining high reputation (80+)
- Building substantial revenue
- Consistently meeting all commitments
- Surviving random events without major disruptions

### Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No dependencies required
- Works in all modern browsers
- Fully responsive design

## Files

- `energy-grid-game.html` - Main game interface
- `energy-grid-game.js` - Game logic and mechanics
- `energy-grid-game.css` - Styling and layout

## Credits

Created as a strategic energy management simulation for understanding power grid operations and the challenges of balancing supply, demand, and transmission constraints.

Enjoy managing Quebec's power grid!
