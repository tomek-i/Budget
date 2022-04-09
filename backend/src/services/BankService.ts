import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
  Account,
  CreateConnectionData,
  CreateUserData,
  CreateUserResponse,
  ListResponse,
} from '../types/basiq';

const institution = 'AU00000';
const loginid = 'Wentworth-Smith';
const loginpassword = 'whislter';

class Basiq {
  apiUrl = 'https://au-api.basiq.io';
  access_token: string | null = null;
  token_type: string | null = null;
  expires_in: number | null = null;

  async token() {
    const data = qs.stringify({
      scope: 'SERVER_ACCESS',
    });

    try {
      const response = await axios.post(`${this.apiUrl}/token`, data, {
        headers: {
          Authorization: `Basic ${process.env.BASIQ_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'basiq-version': '2.0',
        },
      });
      const { access_token, token_type, expires_in } = response.data;
      this.access_token = access_token;
      this.token_type = token_type;
      this.expires_in = expires_in;
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createConnection(data: CreateConnectionData) {
    this.ValidateToken();
    var config: AxiosRequestConfig<any> = {
      method: 'post',
      url: `${this.apiUrl}/users/${data.userid}/connections`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getTransactions(userId: string, accountId?: string) {
    this.ValidateToken();

    if (!userId) throw new Error('A user id needs to be set.');

    let filter = '';

    if (accountId) filter = `?filter=account.id.eq('${accountId}')`;

    var config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: `${this.apiUrl}/users/${userId}/transactions${filter}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };
    try {
      const result = await axios(config);
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAccounts(userId: string): Promise<ListResponse<Account>> {
    this.ValidateToken();

    if (!userId) throw new Error('A user id needs to be set.');

    var config: AxiosRequestConfig<any> = {
      method: 'get',
      url: `${this.apiUrl}/users/${userId}/accounts`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      console.log({ result });
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAccount(userId: string, accountId: string): Promise<Account> {
    this.ValidateToken();

    if (!userId) throw new Error('A user id needs to be set.');
    if (!accountId) throw new Error('A account id needs to be set.');

    var config: AxiosRequestConfig<any> = {
      method: 'get',
      url: `${this.apiUrl}/users/${userId}/accounts/${accountId}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createUser(data: CreateUserData): Promise<CreateUserResponse> {
    this.ValidateToken();

    var config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: `${this.apiUrl}/users`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  private ValidateToken() {
    if (!this.access_token) throw new Error('access_token is not set.');
  }
}

const basiq = new Basiq();

const auth = async (): Promise<any> => {
  return basiq.token();
};

const getAccounts = async (userId: string) => {
  return basiq.getAccounts(userId);
};
const getAccount = async (userId: string, accountId: string) => {
  return basiq.getAccount(userId, accountId);
};
const createConnection = async (data: CreateConnectionData) => {
  return basiq.createConnection(data);
};
const getTransactions = (userId: string, accountId?: string) => {
  return basiq.getTransactions(userId, accountId);
};
const createUser = (data: CreateUserData) => {
  return basiq.createUser(data);
};

export const BankService = {
  auth,
  getTransactions,
  createConnection,
  createUser,
  getAccounts,
  getAccount,
};
