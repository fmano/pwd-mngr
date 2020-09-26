import { Password } from '../models';
import { PasswordService } from '../services/password.service';
import { PasswordController } from './password.controller';
import { mock, instance, when, resetCalls } from 'ts-mockito';
import { BadRequestException } from '@nestjs/common';

const passwordService: PasswordService = mock(PasswordService);
const passwordController: PasswordController = new PasswordController(
  instance(passwordService),
);

describe('getPasswords', () => {
  afterEach(() => {
    resetCalls(passwordService);
  });

  it('returns empty list when user is not sent', () => {
    const passwords = passwordController.getPasswords('');
    expect(passwords).toEqual([]);
  });

  it('returns empty list when user is null', () => {
    const passwords = passwordController.getPasswords(null);
    expect(passwords).toEqual([]);
  });

  it('returns correct password list when user (1) is sent', () => {
    when(passwordService.getPasswords('1')).thenResolve([
      {
        key: '123',
        password: 'pass123',
      } as Password,
    ]);
    const passwords = passwordController.getPasswords('1');
    expect(passwords).toEqual([
      {
        key: '123',
        password: 'pass123',
      } as Password,
    ]);
  });

  it('returns correct password list when user (2) is sent', () => {
    when(passwordService.getPasswords('2')).thenResolve([
      {
        key: '123',
        password: 'pass123',
      },
      {
        key: '345',
        password: 'pass345',
      },
    ] as Password[]);

    const passwords = passwordController.getPasswords('2');
    expect(passwords).toEqual([
      {
        key: '123',
        password: 'pass123',
      } as Password,
      {
        key: '345',
        password: 'pass345',
      } as Password,
    ]);
  });

  it('throws exception when error occurs', () => {
    when(passwordService.getPasswords('1')).thenThrow(Error());

    try {
      passwordController.getPasswords('1');
      fail();
    } catch (error) {
      expect(error).toEqual(Error());
    }
  });
});

describe('addPassword', () => {
  it('throws error when password object is null', () => {
    const expectedError = new BadRequestException('Password object is invalid');
    try {
      passwordController.addPassword(null, '123');
      fail();
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });

  it('throws error when password field null', () => {
    const expectedError = new BadRequestException('Password object is invalid');
    const password = { password: null, key: '123' };
    try {
      passwordController.addPassword(password, '123');
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });

  it('throws error when key field is null', () => {
    const expectedError = new BadRequestException('Password object is invalid');
    const password = { password: '123', key: null };
    try {
      passwordController.addPassword(password, '123');
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });

  it('throws error when userId is null', () => {
    const expectedError = new BadRequestException('User ID is invalid');
    const password = { password: '123', key: '123' };
    try {
      passwordController.addPassword(password, null);
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });

  it('returns added password id on success', () => {
    const password = { password: '123', key: '123' };
    when(passwordService.addPassword(password)).thenReturn('1');
    const result = passwordController.addPassword(password, '123');
    expect(result).toEqual('1');
  });
});
