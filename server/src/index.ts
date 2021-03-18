import { ApolloServer } from "apollo-server-express";
import connectMongo from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

const main = async () => {
	const app = express();
	const PORT = process.env.PORT || 5000;

	const server = new ApolloServer({
		schema: await buildSchema({ resolvers: [__dirname + "/resolvers/*.ts"], container: Container }),
		context: ({ req, res }: any) => ({ req, res }),
	});

	try {
		await mongoose.connect(process.env.MONGO!, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.readyState === 1 && console.log("connected to db");
	} catch (err) {
		console.log(err);
	}

	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL || "http://localhost:3000",
		})
	);

	app.use(cookieParser());
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	const timeTillExpire = 1000 * 60 * 60 * 24 * 7;
	const Store = connectMongo(session);

	app.use(
		session({
			secret: process.env.SESSION_SECRET || "test",
			saveUninitialized: false,
			resave: false,
			name: "moody-session",
			cookie: {
				maxAge: timeTillExpire,
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
			},
			store: new Store({
				collection: "moody-user-sessions",
				uri: process.env.MONGO!,
				expires: timeTillExpire,
			}),
		})
	);

	server.applyMiddleware({ app });
	app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
};

main();
