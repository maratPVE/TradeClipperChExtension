<template>
    <div :style="title">TRADE</div>
  
    <div v-for="(t, i) in journal.trades" :key="i" :style="row">
      <button :style="arrow" @click="t.expanded = !t.expanded">
        {{ t.expanded ? '▾' : '▸' }}
      </button>
  
      <div :style="smallBox">{{ t.order }}</div>
  
      <button :style="[t.side === 'BUY' ? btnBuy : btnSell]">{{ t.side }}</button>
  
      <div :style="pnlPill">
        P&L : <span :style="t.pnl >= 0 ? pnlPos : pnlNeg">{{ signedPct(t.pnl) }}</span>
      </div>
  
      <button :style="btnBE">BE</button>
      <button :style="btnClose">CLOSE</button>
  
      <div v-if="t.expanded" :style="detailsWrap">
        <div :style="gridTwo">
          <div :style="field">ENTRY PRICE : {{ t.details.entryPrice }}</div>
          <div :style="field">BALANCE : {{ t.details.balance }}</div>
          <div :style="field">TP : {{ t.details.tp }}</div>
          <div :style="field">SL : {{ t.details.sl }}</div>
          <div :style="field">LOTS : {{ t.details.lots }}</div>
          <div :style="field">RISK : {{ t.details.risk }} %</div>
        </div>
  
        <div :style="orderInfo">
          <div>Order info</div>
          <div>Lot size : {{ t.orderInfo.lotSize }}</div>
          <div>Pip value : {{ t.orderInfo.pipValue }}</div>
          <div>Reward : {{ t.orderInfo.rewardPct }} / {{ t.orderInfo.rewardAmt }}</div>
          <div>Risk : {{ t.orderInfo.riskPct }} / {{ t.orderInfo.riskAmt }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const journal = inject('journal');
  
  function signedPct(v) {
    const abs = Math.abs(v).toFixed(2);
    return (v >= 0 ? '+' : '-') + abs + '%';
  }
  
  const title = { textAlign: 'center', opacity: 0.9, letterSpacing: '0.4px' };
  
  const row = {
    display: 'grid',
    gridTemplateColumns: '24px 42px 80px 1fr 60px 70px',
    gap: '10px',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #2e3240',
  };
  
  const arrow = {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '1px solid #3a3f51',
    background: '#1b1f2a',
    color: '#c9d1d9',
    cursor: 'pointer',
    lineHeight: '20px',
  };
  
  const smallBox = {
    height: '28px',
    lineHeight: '28px',
    textAlign: 'center',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: '#1b1f2a',
    fontWeight: 700,
  };
  
  const btnBuy = {
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #255a30',
    background: 'linear-gradient(180deg, #32a852, #237a3a)',
    color: '#eaffee',
    fontWeight: 800,
    cursor: 'pointer',
  };
  const btnSell = {
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #6a2323',
    background: 'linear-gradient(180deg, #c04343, #8c2d2d)',
    color: '#ffeeee',
    fontWeight: 800,
    cursor: 'pointer',
  };
  
  const pnlPill = {
    height: '30px',
    lineHeight: '30px',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: '#1b1f2a',
    padding: '0 12px',
    fontWeight: 700,
    color: '#ccd2dc',
  };
  const pnlPos = { color: '#4cd187', marginLeft: '6px', fontWeight: 800 };
  const pnlNeg = { color: '#ff7a7a', marginLeft: '6px', fontWeight: 800 };
  
  const btnBE = {
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #2e5c8a',
    background: 'linear-gradient(180deg, #4aa3ff, #2b78c5)',
    color: '#e9f2ff',
    fontWeight: 800,
    cursor: 'pointer',
  };
  const btnClose = {
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #8a3f2e',
    background: 'linear-gradient(180deg, #ff8755, #cc4f2e)',
    color: '#fff1ea',
    fontWeight: 800,
    cursor: 'pointer',
  };
  
  const detailsWrap = {
    gridColumn: '1 / -1',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };
  const gridTwo = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  };
  const field = {
    height: '32px',
    lineHeight: '32px',
    textAlign: 'center',
    borderRadius: '6px',
    border: '1px solid #3a3f51',
    background: '#1b1f2a',
    fontWeight: 700,
  };
  const orderInfo = {
    border: '1px solid #3a3f51',
    borderRadius: '6px',
    background: '#222634',
    padding: '10px',
    textAlign: 'center',
    display: 'grid',
    gap: '4px',
    fontWeight: 700,
  };
  </script>
  