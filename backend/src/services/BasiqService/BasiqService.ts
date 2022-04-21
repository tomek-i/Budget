import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
  Account,
  CreateConnectionData,
  CreateUserData,
  CreateUserResponse,
  ListResponse,
} from '../../types/basiq';

const institution = 'AU00000';
const loginid = 'Wentworth-Smith';
const loginpassword = 'whislter';

export enum BasiqScope {
  SERVER_ACCESS = 'SERVER_ACCESS',
  CLIENT_SCOPE = 'CLIENT_SCOPE',
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
  async generateToken(scope: BasiqScope, userId?: string) {
    const data = qs.stringify({
      scope,
      userId,
    });
    console.log({ data });
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
   *
   * @returns a token with SERVER_ACCESS
   */
  private async generateServerToken() {
    const { access_token, token_type, expires_in } = await this.generateToken(
      BasiqScope.SERVER_ACCESS,
    );
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    return { access_token, token_type, expires_in };
  }

  /**
   * Gets the conest URL
   * @param userId
   * @returns
   */
  async getConsent(userId: string) {
    let { access_token } = await this.generateToken(
      BasiqScope.CLIENT_SCOPE,
      userId,
    );
    console.log({ CLIENTACCESS: access_token });
    return `https://consent.basiq.io/home?userId=${userId}&token=${access_token}`;
    //return `${this.apiUrl}/home?userId=${userId}&token=${access_token}`;
  }

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

    try {
      const response = await axios(config);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * get transactions under the account of the user
   * @param userId
   * @param accountId
   * @returns
   */
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
      throw error;
    }
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

    try {
      const result = await axios(config);
      return result.data;
    } catch (error) {
      throw error;
    }
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

    try {
      const result = await axios(config);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Creates a user on BASIQ
   * @param data
   * @returns
   */
  async createUser(data: CreateUserData): Promise<CreateUserResponse> {
    this.ValidateToken();

    if (!(data.email || data.mobile))
      throw new Error('You must provide email or mobile.');

    //prefer email, remove mobile
    if (data.email) delete data.mobile;

    //TODO: this does not check if a user with this mobile/email already exists.

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
      throw error;
    }
  }
  /**
   * Ensures that access token is available
   */
  private ValidateToken() {
    if (!this.access_token) throw new Error('access_token is not set.');
  }
}
