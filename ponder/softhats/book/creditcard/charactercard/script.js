// Character object with properties and methods
const character = {
    name: "Warrior Lizard",
    class: "Warrior",
    level: 1,
    health: 100,
    maxHealth: 100,
    image: "warrior-lizard.jpg",
    isDead: false,

  
    attacked: function() {
        if (this.isDead) {
            this.showMessage("Character is already dead! Cannot take more damage.", "danger");
            return;
        }

       
        this.health -= 20;

        
        if (this.health < 0) {
            this.health = 0;
        }

        
        this.updateUI();

        
        const overlay = document.getElementById('statusOverlay');
        overlay.classList.add('damaged');
        setTimeout(() => overlay.classList.remove('damaged'), 300);

        // Check if character died
        if (this.health === 0) {
            this.isDead = true;
            this.die();
        } else {
            this.showMessage(`Took 20 damage! Health: ${this.health}/${this.maxHealth}`, "danger");
        }
    },

    
    levelUp: function() {
        if (this.isDead) {
            this.showMessage("Cannot level up a dead character!", "danger");
            return;
        }

        
        this.level += 1;

        
        this.maxHealth += 20;
        this.health = this.maxHealth;

        
        this.updateUI();

        this.showMessage(`Level Up! Now Level ${this.level}! Max Health: ${this.maxHealth}`, "success");
    },

    
    die: function() {
        const overlay = document.getElementById('statusOverlay');
        overlay.classList.add('dead');
        
        const img = document.getElementById('characterImg');
        img.style.filter = "grayscale(100%)";

        
        document.getElementById('attackBtn').disabled = true;
        document.getElementById('levelUpBtn').disabled = true;

        this.showMessage("💀 The character has died! 💀", "death");
    },

    
    updateUI: function() {
        
        document.getElementById('characterLevel').textContent = this.level;
        document.getElementById('levelBadge').textContent = `Level ${this.level}`;

       
        document.getElementById('healthText').textContent = `${this.health} / ${this.maxHealth}`;

        
        const healthFill = document.getElementById('healthFill');
        const healthPercentage = (this.health / this.maxHealth) * 100;
        healthFill.style.width = healthPercentage + '%';

        
        healthFill.classList.remove('low', 'medium');
        if (healthPercentage <= 25) {
            healthFill.classList.add('low');
        } else if (healthPercentage <= 50) {
            healthFill.classList.add('medium');
        }
    },

    
    showMessage: function(message, type) {
        const messageBox = document.getElementById('messageBox');
        messageBox.textContent = message;
        messageBox.className = 'message-box ' + type;

        
        if (type !== 'death') {
            setTimeout(() => {
                messageBox.textContent = '';
                messageBox.className = 'message-box';
            }, 3000);
        }
    }
};


document.addEventListener('DOMContentLoaded', function() {
    character.updateUI();
    character.showMessage("Ready for battle!", "success");
});
```

## File Structure:
```