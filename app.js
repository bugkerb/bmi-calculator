// BMI Calculator
(function() {
    'use strict';

    // DOM Elements
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightUnit = document.getElementById('height-unit');
    const weightUnit = document.getElementById('weight-unit');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiDescription = document.getElementById('bmi-description');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    let currentUnit = 'metric';

    // BMI categories
    const bmiCategories = [
        { max: 18.5, label: 'Underweight', color: '#3b82f6', class: 'category-underweight', description: 'You may be underweight. Consider consulting a healthcare professional.' },
        { max: 24.9, label: 'Normal Weight', color: '#10b981', class: 'category-normal', description: 'Great! You have a healthy weight. Keep it up!' },
        { max: 29.9, label: 'Overweight', color: '#f59e0b', class: 'category-overweight', description: 'You may be overweight. Consider lifestyle changes or consulting a healthcare professional.' },
        { max: Infinity, label: 'Obese', color: '#ef4444', class: 'category-obese', description: 'Your BMI indicates obesity. Please consult a healthcare professional for guidance.' }
    ];

    // Switch between metric and imperial
    function switchUnit(unit) {
        currentUnit = unit;
        
        // Update toggle buttons
        toggleBtns.forEach(btn => {
            if (btn.dataset.unit === unit) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update unit labels
        if (unit === 'metric') {
            heightUnit.textContent = 'cm';
            weightUnit.textContent = 'kg';
            heightInput.placeholder = '170';
            weightInput.placeholder = '70';
        } else {
            heightUnit.textContent = 'ft';
            weightUnit.textContent = 'lb';
            heightInput.placeholder = '5.7';
            weightInput.placeholder = '150';
        }

        // Clear inputs and hide result
        heightInput.value = '';
        weightInput.value = '';
        resultContainer.classList.remove('visible');
        heightInput.focus();
    }

    // Calculate BMI
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values.');
            return;
        }

        let bmi;

        if (currentUnit === 'metric') {
            // Metric: BMI = weight(kg) / height(m)²
            const heightInMeters = height / 100;
            bmi = weight / (heightInMeters * heightInMeters);
        } else {
            // Imperial: BMI = 703 × weight(lb) / height(in)²
            const heightInInches = height * 12;
            bmi = 703 * weight / (heightInInches * heightInInches);
        }

        // Round to 1 decimal place
        bmi = Math.round(bmi * 10) / 10;

        // Find category
        const category = bmiCategories.find(cat => bmi < cat.max);

        // Display results
        bmiValue.textContent = bmi.toFixed(1);
        bmiValue.style.color = category.color;
        bmiCategory.textContent = category.label;
        bmiCategory.style.backgroundColor = category.color + '20';
        bmiCategory.style.color = category.color;
        bmiDescription.textContent = category.description;
        resultContainer.classList.add('visible');
    }

    // Event listeners
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => switchUnit(btn.dataset.unit));
    });

    calculateBtn.addEventListener('click', calculateBMI);

    // Allow Enter key to calculate
    [heightInput, weightInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                calculateBMI();
            }
        });
    });

    // Focus first input
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => heightInput.focus());
    } else {
        heightInput.focus();
    }
})();
