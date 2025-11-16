{{/*
Helper Template
Questo file contiene tutte le definizioni di template che vengono
riutilizzate nei manifest Kubernetes del chart. Serve a standardizzare
nomi, labels e altre informazioni comuni, evitando duplicazioni.
Ogni funzione è commentata per spiegare cosa fa e come usarla.
*/}}

{{- define "service-deployment-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "service-deployment-app.fullname" -}}
{{- if .Values.fullnameOverride }}
  {{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
  {{- $name := default .Chart.Name .Values.nameOverride }}
  {{- if contains $name .Release.Name }}
    {{- .Release.Name | trunc 63 | trimSuffix "-" }}
  {{- else }}
    {{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
  {{- end }}
{{- end }}
{{- end }}

{{- define "service-deployment-app.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "service-deployment-app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "service-deployment-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "service-deployment-app.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
  {{- default (include "service-deployment-app.fullname" .) .Values.serviceAccount.name }}
{{- else }}
  {{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{/*
5 Common labels (FINAL FIX: Rimosso \n)
   - Genera un blocco YAML multilinea dei label usando dict e toYaml.
*/}}
{{- define "service-deployment-app.labels" -}}
{{- $labels := dict }}
{{- $_ := set $labels "helm.sh/chart" (include "service-deployment-app.chart" .) }}
{{- $_ := set $labels "app.kubernetes.io/name" (include "service-deployment-app.name" .) }}
{{- $_ := set $labels "app.kubernetes.io/instance" .Release.Name }}
{{- $_ := set $labels "app.kubernetes.io/managed-by" .Release.Service }}
{{- toYaml $labels -}}
{{- end }}