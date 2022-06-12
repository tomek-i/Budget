import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
  Account,
  CreateConnectionData,
  CreateUserData,
  CreateUserResponse,
  TokenResponse,
} from '../../types/basiq';
import {
  ListResponse,
  TransactionResponse,
} from '../../../../common/types/basiq.type';
//NOTE: for some reason my process.env is not being set here after the server starts up
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(path.join(__dirname, '../../../.env')) });

// const institution = 'AU00000';
// const loginid = 'Wentworth-Smith';
// const loginpassword = 'whislter';

export enum BasiqScope {
  SERVER_ACCESS = 'SERVER_ACCESS',
  CLIENT_SCOPE = 'CLIENT_ACCESS',
}

export class Basiq {
  apiUrl = 'https://au-api.basiq.io';
  access_token: string | null = null;
  token_type: string | null = null;
  expires_in: number | null = null;

  constructor() {
    this.generateServerToken();
  }

  /**
   * Generates a token with specified scope
   * @param scope the scope of the token
   * @returns a token
   */
  async generateToken(
    scope: BasiqScope,
    userId?: string,
  ): Promise<TokenResponse> {
    const data = qs.stringify({
      scope,
      userId,
    });

    const response = await axios.post(`${this.apiUrl}/token`, data, {
      headers: {
        Authorization: `Basic ${process.env.BASIQ_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'basiq-version': '3.0',
      },
    });
    return response.data;
  }

  /**
   * @returns a token with SERVER_ACCESS
   */
  async generateServerToken() {
    const data = await this.generateToken(BasiqScope.SERVER_ACCESS);
    const { access_token, token_type, expires_in } = data;
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    return data;
  }

  /**
   * Gets the conest URL
   * @param userId
   * @returns
   */
  async getConsentUrl(userId: string) {
    console.log('get client scope');
    let { access_token } = await this.generateToken(
      BasiqScope.CLIENT_SCOPE,
      userId,
    );
    console.log('return URL');
    return `https://consent.basiq.io/home?userId="${userId}"&token=${access_token}`;
  }

  private executeRequest = async (config: AxiosRequestConfig<any>) => {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  };
  /**
   * Create a BANK connection
   * @param data
   * @returns
   */
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

    const response = await axios(config);

    return response.data;
  }

  /**
   *
   * @param jobId
   * @returns
   */
  async getJob(jobId: string) {
    this.ValidateToken();

    if (!jobId) throw new Error('Invalid job id.');

    let config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: `${this.apiUrl}/jobs/${jobId}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  async getJobs(userId: string) {
    this.ValidateToken();

    if (!userId) throw new Error('Invalid user id.');

    let config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: `${this.apiUrl}/users/${userId}/jobs`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async deleteUser(userId: string) {
    this.ValidateToken();

    if (!userId) throw new Error('Invalid user id.');

    let config: AxiosRequestConfig<any> = {
      method: 'DELETE',
      url: `${this.apiUrl}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  async getUser(userId: string) {
    this.ValidateToken();

    if (!userId) throw new Error('Invalid user id.');

    let config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: `${this.apiUrl}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    try {
      const result = await axios(config);
      return result.data;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  /**
   * get transactions under the account of the user
   * @param userId
   * @param accountId
   * @returns
   */
  async getTransactions(
    userId: string,
    accountId?: string,
  ): Promise<ListResponse<TransactionResponse>> {
    this.ValidateToken();

    if (!userId) throw new Error('A user id needs to be set.');

    let filter = '';

    if (accountId) filter = `?filter=account.id.eq('${accountId}')`;

    let config: AxiosRequestConfig<any> = {
      method: 'GET',
      url: `${this.apiUrl}/users/${userId}/transactions${filter}`,
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: 'application/json',
      },
    };

    const result = await axios(config);
    return result.data;
  }

  /**
   * Gets all available accounts for the user
   * @param userId
   * @returns
   */
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

    const result = await axios(config);
    return result.data;
  }

  /**
   * Get the specified account information from the user
   * @param userId the user id
   * @param accountId the account id to get information from
   * @returns
   */
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

    const result = await axios(config);
    return result.data;
  }

  /**
   * Creates a user on BASIQ
   * @param data
   * @returns
   */
  async createUser(data: CreateUserData): Promise<CreateUserResponse> {
    this.ValidateToken();

    if (!(data.email || data.mobile))
      throw new Error('You must provide an email or mobile number.');

    //prefer email, remove mobile
    //if (data.email) delete data.mobile;

    //TODO: this does not check if a user with this mobile/email already exists

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
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  /**
   * Ensures that access token is available
   */
  private ValidateToken() {
    if (!this.access_token) throw new Error('access_token is not set.');
  }
}
