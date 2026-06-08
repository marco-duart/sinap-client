import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { metricsService, type EstimationAccuracyMetrics } from "../../services/metrics.service";
import { ProcessingScreen } from "../../components/processing-screen";
import toast from "react-hot-toast";
import * as S from "./metrics-styles";

export const EstimationAccuracyPage = () => {
  const [metrics, setMetrics] = useState<EstimationAccuracyMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await metricsService.getEstimationAccuracy();
      setMetrics(data);
    } catch (error) {
      toast.error("Erro ao carregar métricas de estimativas");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return <ProcessingScreen message="Carregando métricas..." />;
  }

  return (
    <Layout
      title="Acurácia de Estimativas"
      subtitle="Qualidade e precisão do planejamento"
    >
      <S.Container>
        <S.MetricsGrid>
          <S.MetricCard>
            <S.MetricIcon>🎯</S.MetricIcon>
            <S.MetricTitle>Acurácia Geral</S.MetricTitle>
            <S.MetricValue>{metrics.overallAccuracy.toFixed(1)}%</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>📊</S.MetricIcon>
            <S.MetricTitle>Tasks Analisadas</S.MetricTitle>
            <S.MetricValue>{metrics.totalTasksAnalyzed}</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>✅</S.MetricIcon>
            <S.MetricTitle>Taxa Acertada</S.MetricTitle>
            <S.MetricValue>{metrics.accurateRate.toFixed(1)}%</S.MetricValue>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>📈</S.MetricIcon>
            <S.MetricTitle>Desvio Médio (dias)</S.MetricTitle>
            <S.MetricValue>{metrics.averageDayDeviation.toFixed(1)}</S.MetricValue>
          </S.MetricCard>
        </S.MetricsGrid>

        <S.DetailsSection>
          <S.SectionTitle>Distribuição de Estimativas</S.SectionTitle>
          <S.StatsList>
            <S.StatsItem>
              <span>Over (Superestimadas): {metrics.overestimatedRate.toFixed(1)}%</span>
              <S.ProgressBar>
                <S.ProgressFill
                  style={{ width: `${metrics.overestimatedRate}%` }}
                  color="warning"
                />
              </S.ProgressBar>
            </S.StatsItem>
            <S.StatsItem>
              <span>Under (Subestimadas): {metrics.underestimatedRate.toFixed(1)}%</span>
              <S.ProgressBar>
                <S.ProgressFill
                  style={{ width: `${metrics.underestimatedRate}%` }}
                  color="error"
                />
              </S.ProgressBar>
            </S.StatsItem>
            <S.StatsItem>
              <span>Corretas: {(100 - metrics.overestimatedRate - metrics.underestimatedRate).toFixed(1)}%</span>
              <S.ProgressBar>
                <S.ProgressFill
                  style={{ width: `${100 - metrics.overestimatedRate - metrics.underestimatedRate}%` }}
                  color="success"
                />
              </S.ProgressBar>
            </S.StatsItem>
          </S.StatsList>
        </S.DetailsSection>
      </S.Container>
    </Layout>
  );
};
