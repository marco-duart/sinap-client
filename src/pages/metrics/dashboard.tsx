import { useState, useEffect } from "react";
import { Layout } from "../../components/layout";
import { metricsService, type DashboardMetrics } from "../../services/metrics.service";
import { ProcessingScreen } from "../../components/processing-screen";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import toast from "react-hot-toast";
import * as S from "./styles";

export const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await metricsService.getDashboard();
      setMetrics(data);
    } catch (error) {
      toast.error("Erro ao carregar métricas");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return <ProcessingScreen message="Carregando métricas..." />;
  }

  return (
    <Layout title="Métricas e Indicadores" subtitle="Acompanhe o desempenho da sua equipe e projetos">
      <S.Container>
        <S.MetricsGrid>
          <S.MetricCard>
            <S.MetricIcon>📊</S.MetricIcon>
            <S.MetricTitle>Projetos Totais</S.MetricTitle>
            <S.MetricValue>{metrics.totalProjects}</S.MetricValue>
            <S.MetricDetail>
              {metrics.activeProjects} ativos, {metrics.completedProjects} concluídos
            </S.MetricDetail>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>✅</S.MetricIcon>
            <S.MetricTitle>Taxa de Conclusão</S.MetricTitle>
            <S.MetricValue>{metrics.taskCompletionRate.toFixed(1)}%</S.MetricValue>
            <S.MetricDetail>
              {metrics.completedTasks} de {metrics.totalTasks} tasks
            </S.MetricDetail>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>🚀</S.MetricIcon>
            <S.MetricTitle>Velocidade Média</S.MetricTitle>
            <S.MetricValue>{metrics.averageVelocity.toFixed(1)}</S.MetricValue>
            <S.MetricDetail>pontos por semana</S.MetricDetail>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>🎯</S.MetricIcon>
            <S.MetricTitle>Acurácia Estimativas</S.MetricTitle>
            <S.MetricValue>{metrics.estimationAccuracy.toFixed(1)}%</S.MetricValue>
            <S.MetricDetail>precisão de planejamento</S.MetricDetail>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>📅</S.MetricIcon>
            <S.MetricTitle>Aderência ao Prazo</S.MetricTitle>
            <S.MetricValue>{metrics.scheduleAdherence.toFixed(1)}%</S.MetricValue>
            <S.MetricDetail>cumprimento de cronograma</S.MetricDetail>
          </S.MetricCard>

          <S.MetricCard>
            <S.MetricIcon>⚡</S.MetricIcon>
            <S.MetricTitle>Projetos Urgentes</S.MetricTitle>
            <S.MetricValue>{metrics.urgentProjects}</S.MetricValue>
            <S.MetricDetail>requerem atenção imediata</S.MetricDetail>
          </S.MetricCard>
        </S.MetricsGrid>

        <S.DetailsSection>
          <S.SectionTitle>Esforço Estimado vs Concluído</S.SectionTitle>
          <S.EffortBar>
            <S.EffortCompleted
              style={{
                width:
                  metrics.totalEstimatedEffort > 0
                    ? `${(metrics.completedEffort / metrics.totalEstimatedEffort) * 100}%`
                    : "0%",
              }}
            >
              {metrics.completedEffort}/{metrics.totalEstimatedEffort}
            </S.EffortCompleted>
          </S.EffortBar>
          <S.EffortStats>
            <div>Completado: {metrics.completedEffort} pontos</div>
            <div>Total: {metrics.totalEstimatedEffort} pontos</div>
          </S.EffortStats>
        </S.DetailsSection>

        <S.ChartsSection>
          <S.ChartContainer>
            <S.ChartTitle>Distribuição de Projetos</S.ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Ativos", value: metrics.activeProjects, fill: "#08CFCC" },
                    { name: "Concluídos", value: metrics.completedProjects, fill: "#27AE60" },
                    { name: "Urgentes", value: metrics.urgentProjects, fill: "#D91B5B" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2].map((index) => (
                    <Cell key={`cell-${index}`} fill={["#08CFCC", "#27AE60", "#D91B5B"][index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value} projetos`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </S.ChartContainer>

          <S.ChartContainer>
            <S.ChartTitle>Taxa de Conclusão por Semana</S.ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { week: "Semana 1", completion: 65 },
                  { week: "Semana 2", completion: 72 },
                  { week: "Semana 3", completion: 68 },
                  { week: "Semana 4", completion: 75 },
                  { week: "Semana 5", completion: metrics.taskCompletionRate },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completion" fill="#08CFCC" name="Taxa de Conclusão %" />
              </BarChart>
            </ResponsiveContainer>
          </S.ChartContainer>
        </S.ChartsSection>

        <S.ButtonGroup>
          <S.LinkButton href="/metrics/productivity">
            📈 Produtividade da Equipe
          </S.LinkButton>
          <S.LinkButton href="/metrics/team">
            👥 Performance por Membro
          </S.LinkButton>
          <S.LinkButton href="/metrics/accuracy">
            🎯 Acurácia de Estimativas
          </S.LinkButton>
        </S.ButtonGroup>
      </S.Container>
    </Layout>
  );
};
