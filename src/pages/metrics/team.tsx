import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { metricsService, type TeamPerformanceMetrics } from "../../services/metrics.service";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./metrics-styles";

export const TeamPerformancePage = () => {
  const [metrics, setMetrics] = useState<TeamPerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await metricsService.getTeamPerformance();
      setMetrics(data);
    } catch (error) {
      toast.error("Erro ao carregar métricas de performance");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return <ProcessingScreen message="Carregando métricas..." />;
  }

  return (
    <Layout title="Performance do Time" subtitle="Desempenho por membro da equipe">
      <S.Container>
        <S.MetricsGrid>
          <S.MetricCard>
            <S.MetricIcon>👥</S.MetricIcon>
            <S.MetricTitle>Velocidade do Time</S.MetricTitle>
            <S.MetricValue>{metrics.teamAverageVelocity.toFixed(1)}</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>⭐</S.MetricIcon>
            <S.MetricTitle>Performance Score</S.MetricTitle>
            <S.MetricValue>{metrics.teamAveragePerformanceScore.toFixed(1)}</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>📈</S.MetricIcon>
            <S.MetricTitle>Balanceamento</S.MetricTitle>
            <S.MetricValue>{metrics.workloadBalance.toFixed(1)}%</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>🎯</S.MetricIcon>
            <S.MetricTitle>Aderência</S.MetricTitle>
            <S.MetricValue>{metrics.teamScheduleAdherence.toFixed(1)}%</S.MetricValue>
          </S.MetricCard>
        </S.MetricsGrid>
      </S.Container>
    </Layout>
  );
};
