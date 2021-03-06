const TRANSACTION_STATUS_TYPES = {
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  PENDING: "PENDING",
};

const TRANSACTION_NAMES = {
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  GET_TODOS: "GET_TODOS",
  GET_TODO: "GET_TODO",
};

const CHAIN_TYPES = {
  ETHEREUM_MAINNET: "eth",
  BSC_MAINNET: "bsc",
  KOVAN_TESTNET: "kovan",
  GANACHE_TESTNET: "ganache",
};

export { TRANSACTION_STATUS_TYPES, TRANSACTION_NAMES, CHAIN_TYPES };
