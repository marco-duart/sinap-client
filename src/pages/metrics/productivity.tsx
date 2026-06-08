import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { metricsService, type ProductivityMetrics } from "../../services/metrics.service";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./metrics-styles";

export const ProductivityPage = () => {
  const [metrics, setMetrics] = useState<ProductivityMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await metricsService.getProductivity();
      setMetrics(data);
    } catch (error) {
      toast.error("Erro ao carregar métricas de produtividade");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return <ProcessingScreen message="Carregando métricas..." />;
  }

  return (
    <Layout title="Produtividade da Equipe" subtitle="Analise o desempenho de produção">
      <S.Container>
        <S.MetricsGrid>
          <S.MetricCard>
            <S.MetricIcon>⚡</S.MetricIcon>
            <S.MetricTitle>Velocidade Média</S.MetricTitle>
            <S.MetricValue>{metrics.averageVelocity.toFixed(1)}</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>📊</S.MetricIcon>
            <S.MetricTitle>Velocidade Semanal</S.MetricTitle>
            <S.MetricValue>{metrics.weeklyVelocity.toFixed(1)}</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>⏱️</S.MetricIcon>
            <S.MetricTitle>Taxa Semanal</S.MetricTitle>
            <S.MetricValue>{metrics.weeklyCompletionRate.toFixed(1)}%</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>✅</S.MetricIcon>
            <S.MetricTitle>Tasks Última Semana</S.MetricTitle>
            <S.MetricValue>{metrics.completedTasksLastWeek}</S.MetricValue>
          </S.MetricCard>
        </S.MetricsGrid>
      </S.Container>
    </Layout>
  );
};
