// Quebec Energy Grid Manager Game

class EnergyGridGame {
    constructor() {
        this.day = 1;
        this.revenue = 0;
        this.reputation = 100;

        // Production sources
        this.productionSources = [
            { id: 'hydro', name: 'Hydro Plant', capacity: 2000, current: 1500, cost: 2, adjustable: true },
            { id: 'nuclear', name: 'Nuclear Plant', capacity: 1000, current: 900, cost: 3, adjustable: false },
            { id: 'wind', name: 'Wind Farm', capacity: 500, current: 0, cost: 1, adjustable: false, variable: true },
            { id: 'solar', name: 'Solar Farm', capacity: 300, current: 0, cost: 1, adjustable: false, variable: true }
        ];

        // Local demand (Quebec)
        this.localDemand = 2000;
        this.demandVariability = 200;

        // Transmission lines for exports
        this.transmissionLines = [
            { id: 'ny', name: 'New York', capacity: 800, current: 200, price: 50, contract: 150 },
            { id: 'nh', name: 'New Hampshire', capacity: 400, current: 100, price: 45, contract: 100 },
            { id: 'ne', name: 'New England', capacity: 600, current: 150, price: 48, contract: 120 }
        ];

        this.events = [];
        this.maxEvents = 5;

        this.init();
    }

    init() {
        this.renderProductionSources();
        this.renderTransmissionLines();
        this.updateDisplay();
        this.checkBalance();

        // Event listeners
        document.getElementById('next-day-btn').addEventListener('click', () => this.nextDay());
        document.getElementById('reset-btn').addEventListener('click', () => this.reset());
    }

    renderProductionSources() {
        const container = document.getElementById('production-sources');
        container.innerHTML = '';

        this.productionSources.forEach(source => {
            const sourceDiv = document.createElement('div');
            sourceDiv.className = 'production-source';

            const info = document.createElement('div');
            info.className = 'source-info';
            info.innerHTML = `
                <strong>${source.name}</strong>
                <span class="capacity">${source.current} / ${source.capacity} MW</span>
            `;

            const controls = document.createElement('div');
            controls.className = 'source-controls';

            if (source.adjustable) {
                const slider = document.createElement('input');
                slider.type = 'range';
                slider.min = 0;
                slider.max = source.capacity;
                slider.value = source.current;
                slider.step = 50;
                slider.addEventListener('input', (e) => {
                    source.current = parseInt(e.target.value);
                    this.updateDisplay();
                    this.checkBalance();
                });
                controls.appendChild(slider);
            } else if (source.variable) {
                const variableLabel = document.createElement('span');
                variableLabel.className = 'variable-label';
                variableLabel.textContent = 'Weather Dependent';
                controls.appendChild(variableLabel);
            } else {
                const fixedLabel = document.createElement('span');
                fixedLabel.className = 'fixed-label';
                fixedLabel.textContent = 'Base Load';
                controls.appendChild(fixedLabel);
            }

            sourceDiv.appendChild(info);
            sourceDiv.appendChild(controls);
            container.appendChild(sourceDiv);
        });
    }

    renderTransmissionLines() {
        const container = document.getElementById('transmission-lines');
        container.innerHTML = '';

        this.transmissionLines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'transmission-line';

            const info = document.createElement('div');
            info.className = 'line-info';
            info.innerHTML = `
                <strong>${line.name}</strong>
                <span class="line-details">
                    Capacity: ${line.capacity} MW |
                    Price: $${line.price}/MW |
                    Contract: ${line.contract} MW
                </span>
            `;

            const controls = document.createElement('div');
            controls.className = 'line-controls';

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = 0;
            slider.max = line.capacity;
            slider.value = line.current;
            slider.step = 50;
            slider.addEventListener('input', (e) => {
                line.current = parseInt(e.target.value);
                this.updateDisplay();
                this.checkBalance();
            });

            const valueLabel = document.createElement('span');
            valueLabel.className = 'export-value';
            valueLabel.textContent = `${line.current} MW`;
            slider.addEventListener('input', (e) => {
                valueLabel.textContent = `${e.target.value} MW`;
            });

            controls.appendChild(slider);
            controls.appendChild(valueLabel);

            lineDiv.appendChild(info);
            lineDiv.appendChild(controls);
            container.appendChild(lineDiv);
        });
    }

    updateDisplay() {
        // Update stats
        document.getElementById('day').textContent = this.day;
        document.getElementById('revenue').textContent = `$${this.revenue.toLocaleString()}`;
        document.getElementById('reputation').textContent = this.reputation;

        // Update production
        const totalProduction = this.getTotalProduction();
        document.getElementById('total-production').textContent = totalProduction;

        // Update demand
        document.getElementById('local-demand').textContent = this.localDemand;
        const demandPercentage = (this.localDemand / 3000) * 100;
        document.getElementById('demand-bar').style.width = `${demandPercentage}%`;

        // Update exports
        const totalExports = this.getTotalExports();
        document.getElementById('total-exports').textContent = totalExports;

        // Update balance equation
        document.getElementById('balance-production').textContent = `${totalProduction} MW`;
        document.getElementById('balance-demand').textContent = `${this.localDemand} MW`;
        document.getElementById('balance-exports').textContent = `${totalExports} MW`;
    }

    getTotalProduction() {
        return this.productionSources.reduce((sum, source) => sum + source.current, 0);
    }

    getTotalExports() {
        return this.transmissionLines.reduce((sum, line) => sum + line.current, 0);
    }

    checkBalance() {
        const totalProduction = this.getTotalProduction();
        const totalDemand = this.localDemand + this.getTotalExports();
        const difference = totalProduction - totalDemand;

        const statusElement = document.getElementById('grid-status');
        const balanceMessage = document.getElementById('balance-message');

        if (Math.abs(difference) < 50) {
            statusElement.textContent = 'BALANCED';
            statusElement.className = 'stat-value balanced';
            balanceMessage.textContent = '✓ Grid is balanced!';
            balanceMessage.className = 'balance-message success';
        } else if (difference > 0) {
            statusElement.textContent = 'OVERSUPPLY';
            statusElement.className = 'stat-value warning';
            balanceMessage.textContent = `⚠ Excess production: ${difference} MW (wasted energy)`;
            balanceMessage.className = 'balance-message warning';
        } else {
            statusElement.textContent = 'SHORTAGE';
            statusElement.className = 'stat-value danger';
            balanceMessage.textContent = `❌ Energy shortage: ${Math.abs(difference)} MW (blackouts!)`;
            balanceMessage.className = 'balance-message danger';
        }
    }

    nextDay() {
        // Calculate day results
        const totalProduction = this.getTotalProduction();
        const totalDemand = this.localDemand + this.getTotalExports();
        const difference = totalProduction - totalDemand;

        // Check if demand is met
        if (difference < -50) {
            this.reputation -= 10;
            this.addEvent(`⚠️ BLACKOUT! Energy shortage caused power outages. Reputation -10`);
        } else if (Math.abs(difference) < 50) {
            this.reputation = Math.min(100, this.reputation + 2);
            this.addEvent(`✓ Grid balanced successfully. Reputation +2`);
        }

        // Calculate revenue from exports
        let exportRevenue = 0;
        this.transmissionLines.forEach(line => {
            const revenue = line.current * line.price;
            exportRevenue += revenue;

            // Penalty for not meeting contract
            if (line.current < line.contract) {
                const penalty = (line.contract - line.current) * line.price * 0.5;
                exportRevenue -= penalty;
                this.reputation -= 2;
                this.addEvent(`⚠️ Failed to meet ${line.name} contract. Penalty: $${penalty.toFixed(0)}`);
            }
        });

        this.revenue += exportRevenue;

        if (exportRevenue > 0) {
            this.addEvent(`💰 Export revenue: $${exportRevenue.toLocaleString()}`);
        }

        // Random events
        this.generateRandomEvent();

        // Update demand for next day
        this.localDemand = 2000 + Math.floor(Math.random() * this.demandVariability * 2) - this.demandVariability;

        // Update renewable production (weather dependent)
        this.productionSources.forEach(source => {
            if (source.variable) {
                if (source.id === 'wind') {
                    source.current = Math.floor(Math.random() * source.capacity);
                } else if (source.id === 'solar') {
                    source.current = Math.floor(Math.random() * source.capacity);
                }
            }
        });

        // Check reputation
        if (this.reputation <= 0) {
            this.addEvent(`💥 GAME OVER! Your reputation is too low. You've been removed from managing the grid.`);
            document.getElementById('next-day-btn').disabled = true;
            return;
        }

        // Advance day
        this.day++;

        // Re-render and update
        this.renderProductionSources();
        this.updateDisplay();
        this.checkBalance();
    }

    generateRandomEvent() {
        const events = [
            {
                chance: 0.1,
                effect: () => {
                    const hydro = this.productionSources.find(s => s.id === 'hydro');
                    hydro.capacity -= 200;
                    this.addEvent(`⚠️ Equipment failure at Hydro Plant! Capacity reduced by 200 MW.`);
                }
            },
            {
                chance: 0.15,
                effect: () => {
                    const line = this.transmissionLines[Math.floor(Math.random() * this.transmissionLines.length)];
                    line.capacity = Math.max(200, line.capacity - 100);
                    this.addEvent(`⚡ Transmission line to ${line.name} damaged! Capacity reduced.`);
                }
            },
            {
                chance: 0.1,
                effect: () => {
                    this.localDemand += 300;
                    this.addEvent(`🌡️ Heat wave! Local demand increased by 300 MW.`);
                }
            },
            {
                chance: 0.15,
                effect: () => {
                    const line = this.transmissionLines[Math.floor(Math.random() * this.transmissionLines.length)];
                    line.price += 10;
                    this.addEvent(`📈 ${line.name} increased prices to $${line.price}/MW.`);
                }
            }
        ];

        events.forEach(event => {
            if (Math.random() < event.chance) {
                event.effect();
            }
        });
    }

    addEvent(message) {
        const log = document.getElementById('events-log');
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.innerHTML = `<span class="event-day">Day ${this.day}:</span> ${message}`;
        log.insertBefore(eventDiv, log.firstChild);

        // Keep only last N events
        while (log.children.length > this.maxEvents) {
            log.removeChild(log.lastChild);
        }
    }

    reset() {
        location.reload();
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnergyGridGame();
});
