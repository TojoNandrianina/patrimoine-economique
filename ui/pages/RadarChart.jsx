import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

// Enregistrez les composants nécessaires
ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date), // Utilisez les dates comme labels pour le graphique radar
    datasets: [
      {
        label: "Valeur du Patrimoine",
        data: data.map((d) => d.valeur), // Les valeurs pour le graphique radar
        borderColor: "rgba(255, 99, 132, 1)", // Couleur de la bordure
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Couleur de l'arrière-plan
        pointBackgroundColor: "rgba(255, 99, 132, 1)", // Couleur des points
        pointBorderColor: "#fff", // Couleur des bordures des points
        pointHoverBackgroundColor: "#fff", // Couleur de l'arrière-plan des points au survol
        pointHoverBorderColor: "rgba(255, 99, 132, 1)", // Couleur de la bordure des points au survol
        fill: true,
        tension: 0.3, // Ajoute une courbe douce aux lignes
      },
      // Tu peux ajouter d'autres jeux de données ici pour plus de couleurs
      {
        label: "Autre Jeu de Données",
        data: data.map((d) => d.valeur * 1.2), // Exemple de données
        borderColor: "rgba(54, 162, 235, 1)", // Couleur de la bordure
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Couleur de l'arrière-plan
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Couleur des points
        pointBorderColor: "#fff", // Couleur des bordures des points
        pointHoverBackgroundColor: "#fff", // Couleur de l'arrière-plan des points au survol
        pointHoverBorderColor: "rgba(54, 162, 235, 1)", // Couleur de la bordure des points au survol
        fill: true,
        tension: 0.3, // Ajoute une courbe douce aux lignes
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
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Couleur de la grille
        },
        ticks: {
          backdropColor: 'rgba(255, 255, 255, 0.5)', // Couleur de fond des ticks
          color: '#666', // Couleur des ticks
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ height: "800px", width: "100%" , marginTop: "2vh", marginBottom: "5vh"}}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
