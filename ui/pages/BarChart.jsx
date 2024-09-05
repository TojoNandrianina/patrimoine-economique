import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Enregistrez les composants nécessaires
ChartJS.register(
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.map((d) => d.date), // Utilisez les dates comme labels pour le graphique à barres
        datasets: [
            {
                label: "Valeur du Patrimoine",
                data: data.map((d) => d.valeur), // Les valeurs pour le graphique à barres
                backgroundColor: "rgba(255, 99, 132, 0.2)", // Couleur de l'arrière-plan des barres
                borderColor: "rgba(255, 99, 132, 1)", // Couleur de la bordure des barres
                borderWidth: 1, // Épaisseur de la bordure des barres
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333', // Couleur des étiquettes de la légende
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Valeur: ${context.raw}`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Couleur de la grille
                },
                ticks: {
                    color: '#666', // Couleur des ticks
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // Couleur de la grille
                },
                ticks: {
                    color: '#666', // Couleur des ticks
                },
            },
        },
    };

    return (
        <div className="chart-container" style={{ height: "800px", width: "100%", marginTop: "2vh", marginBottom: "5vh" }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
