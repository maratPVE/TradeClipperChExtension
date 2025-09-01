<template>
    <div :style="root">
      <MetaBar />
      <TopBar />
  
      <SectionDivider />
      <ConfirmationsSection />
  
      <SectionDivider />
      <TradesSection />
  
      <SectionDivider />
      <NotesSection />
  
      <SectionDivider />
      <FeelingsSection />
  
      <FooterCta />
    </div>
  </template>
  
  <script setup>
  import { reactive, provide } from 'vue';
  
  import MetaBar from './sections/MetaBar.vue';
  import TopBar from './sections/TopBar.vue';
  import ConfirmationsSection from './sections/confirmations/ConfirmationsSection.vue';
  import TradesSection from './sections/TradesSection.vue';
  import NotesSection from './sections/NotesSection.vue';
  import FeelingsSection from './sections/FeelingsSection.vue';
  import FooterCta from './sections/FooterCta.vue';
  import SectionDivider from './sections/SectionDivider.vue';
  
  // État mock partagé via provide/inject (simple et sans Pinia)
  const journal = reactive({
    copyTo: 'JOURNAL 1',
    symbol: 'EUR/USD',
    dateISO: '2023-08-24',
    confirmations: ['VI', 'IPDA', 'IPDA', 'CISD', 'SMT', 'SMT', 'FVG', 'PO3'],
    notes:
      'CONFIRMATIONS : VI H5 + IFVG H1 + PO3 M15 + IPDA M5 + CISD M1 + VI M1 + SMT M1',
    trades: [
      {
        order: 1,
        side: 'BUY',
        pnl: 13.45,
        expanded: true,
        details: {
          entryPrice: '1.14253',
          balance: '10 353$',
          tp: '1.14453',
          sl: '1.14053',
          lots: '0.12',
          risk: 5,
        },
        orderInfo: {
          lotSize: '100000',
          pipValue: '0.2 EUR',
          rewardPct: '11.32%',
          rewardAmt: '10.75 EUR',
          riskPct: '4.38%',
          riskAmt: '4.16 EUR',
        },
      },
      {
        order: 1,
        side: 'SELL',
        pnl: -5.45,
        expanded: false,
        details: { entryPrice: '', balance: '', tp: '', sl: '', lots: '', risk: '' },
        orderInfo: { lotSize: '', pipValue: '', rewardPct: '', rewardAmt: '', riskPct: '', riskAmt: '' },
      },
    ],
  });
  
  provide('journal', journal);
  
  const root = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '8px',
    color: '#c9d1d9',
    fontSize: '12px',
  };
  </script>
  