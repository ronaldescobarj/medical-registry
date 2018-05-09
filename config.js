config = {
    db: {
        max: 10,
        host: 'postgres://nahjiwluttjqry:d1a377abcd2d8c92624a1004bf2a4e0a36db7f8fb98b70dd0cbe96ca878993d1@ec2-50-19-232-205.compute-1.amazonaws.com',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'medical_history',
        idleTimeoutMillis: 1000
    }
};

module.exports = config;