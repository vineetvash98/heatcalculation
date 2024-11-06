function calculateHeating() {
    // Get user inputs
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const nonHeated = parseFloat(document.getElementById('nonHeated').value) || 0; // Default to 0 if not entered
    const insulation = parseFloat(document.getElementById('insulation').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const electricityCost = parseFloat(document.getElementById('electricityCost').value);

    // Validate inputs
    if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0 || isNaN(hours) || hours <= 0 || isNaN(electricityCost) || electricityCost <= 0) {
        alert('Please enter valid values for all fields.');
        return;
    }

    // Calculate total floor area
    const totalArea = length * width;

    // Calculate heated area by subtracting non-heated areas
    const heatedArea = totalArea - nonHeated;

    // Reduce by 10% as recommended
    const adjustedArea = heatedArea * 0.9;

    // Calculate the wattage required (watts per m²)
    const wattageRequired = adjustedArea * insulation;

    // Calculate the total energy consumption (in kWh) over the specified duration
    const energyConsumption = (wattageRequired * hours) / 1000; // Convert watts to kilowatts

    // Calculate the total cost of heating for the given hours (in local currency)
    const heatingCost = energyConsumption * electricityCost;

    // Round the adjusted area to the nearest available mat size (e.g., rounded to nearest 1 m²)
    const nearestMatSize = Math.round(adjustedArea);

    // Display result
    const resultElement = document.getElementById('result');
    const wattageElement = document.getElementById('wattage');
    const recommendedSizeElement = document.getElementById('recommendedSize');
    const energyConsumptionElement = document.getElementById('energyConsumption');
    const heatingCostElement = document.getElementById('heatingCost');

    wattageElement.innerText = `You will need approximately ${wattageRequired.toFixed(0)} watts for this room.`;
    recommendedSizeElement.innerText = `Recommended heating mat size: ${nearestMatSize} m².`;
    energyConsumptionElement.innerText = `Energy consumption for ${hours} hour(s): ${energyConsumption.toFixed(2)} kWh.`;
    heatingCostElement.innerText = `Estimated heating cost for ${hours} hour(s): ${heatingCost.toFixed(2)}.`;

    // Show the result section
    resultElement.style.display = 'block';

    // Show the PDF button
    document.getElementById('generatePDF').style.display = 'block';
}

function generatePDF() {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the calculated results
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const nonHeated = parseFloat(document.getElementById('nonHeated').value) || 0;
    const insulation = parseFloat(document.getElementById('insulation').value);
    const hours = parseFloat(document.getElementById('hours').value);
    const electricityCost = parseFloat(document.getElementById('electricityCost').value);

    // Calculate total floor area
    const totalArea = length * width;

    // Calculate heated area by subtracting non-heated areas
    const heatedArea = totalArea - nonHeated;

    // Reduce by 10% as recommended
    const adjustedArea = heatedArea * 0.9;

    // Calculate the wattage required (watts per m²)
    const wattageRequired = adjustedArea * insulation;

    // Calculate the total energy consumption (in kWh) over the specified duration
    const energyConsumption = (wattageRequired * hours) / 1000;

    // Calculate the total cost of heating for the given hours (in local currency)
    const heatingCost = energyConsumption * electricityCost;

    // Round the adjusted area to the nearest available mat size (e.g., rounded to nearest 1 m²)
    const nearestMatSize = Math.round(adjustedArea);

    // Add content to the PDF
    doc.setFont("helvetica");
    doc.setFontSize(16);
    doc.text("Underfloor Heating Calculation", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Room Dimensions: ${length}m x ${width}m`, 20, 30);
    doc.text(`Non-heated Area: ${nonHeated}m²`, 20, 40);
    doc.text(`Heated Area: ${heatedArea.toFixed(2)}m²`, 20, 50);
    doc.text(`Adjusted Heated Area (90%): ${adjustedArea.toFixed(2)}m²`, 20, 60);
    doc.text(`Insulation Quality: ${insulation}W/m²`, 20, 70);
    doc.text(`Wattage Required: ${wattageRequired.toFixed(0)}W`, 20, 80);
    doc.text(`Energy Consumption for ${hours} hour(s): ${energyConsumption.toFixed(2)} kWh`, 20, 90);
    doc.text(`Heating Cost for ${hours} hour(s): ${heatingCost.toFixed(2)}`, 20, 100);
    doc.text(`Recommended Heating Mat Size: ${nearestMatSize}m²`, 20, 110);
    
    // Save the generated PDF
    doc.save('Underfloor_Heating_Calculation.pdf');
}
